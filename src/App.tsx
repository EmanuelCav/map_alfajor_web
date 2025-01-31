import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from '../firebase.config'

import CurrentMarker from "./app/components/CurrentMarker";
import AlfajoresList from "./app/components/AlfajoresList";
import ShowKiosco from "./app/components/ShowKiosco";
import SearchInput from "./app/components/SearchInput";
import ResultSearch from "./app/components/ResultSearch";
import CreateAlfajorForm from "./app/components/CreateAlfajorForm";
import Loading from "./app/components/Loading";

import { generalStore } from "./app/server/store";

import { IAddKiosco, IKiosco } from "./app/interface/Kiosco";
import { IAlfajor, IAlfajorSelected, ICreateAlfajor } from "./app/interface/Alfajor";

const App = () => {

  const position: [number, number] = [-34.6083, -58.3712]

  const customIcon = new L.Icon({
    iconUrl: "/icon.png",
    iconSize: [40, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const { showKioscos, kioscos, showKiosco, kiosco, uploadKiosco, editKiosco } = generalStore()

  const [loading, setLoading] = useState<boolean>(true)
  const [addAlfajores, setAddAlfajores] = useState<boolean>(false)
  const [isShowKiosco, setIsShowKiosco] = useState<boolean>(false)
  const [isCreateAlfajor, setIsCreateAlfajor] = useState<boolean>(false)
  const [isFiltered, setIsFiltered] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(window.innerWidth);

  const [error, setError] = useState<string>("")
  const [createData, setCreateData] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [details, setDetails] = useState<string>("")

  const [zoom, setZoom] = useState<number>(5)

  const [alfajorData, setAlfajorData] = useState<IAlfajor[]>([])
  const [currentMarker, setCurrentMarker] = useState<[number, number][]>([])

  const AddMarkerOnClick = () => {
    if (width <= 768) {
      const map = useMapEvents({
        click: (e) => {
          const { lat, lng } = e.latlng
          setCurrentMarker([[lat, lng]])
          map.flyTo([lat, lng], 18)
        }
      })
    } else {
      const map = useMapEvents({
        contextmenu: (e) => {
          const { lat, lng } = e.latlng
          setCurrentMarker([[lat, lng]])
          map.flyTo([lat, lng], 18)
        }
      })
    }

    return null
  }

  const ZoomDisplay = () => {
    const map = useMap()

    useEffect(() => {
      const handleZoom = () => {
        setZoom(map.getZoom())
      };

      map.on("zoomend", handleZoom)

      return () => {
        map.off("zoomend", handleZoom)
      }
    }, [map])

    return null
  }

  const RecenterAutomatically = () => {
    const map = useMap()

    if(kiosco.id) {
      useEffect(() => {
        map.setView([kiosco.latitude as number, kiosco.longitude as number], 18, {
          animate: true
        });
      }, [kiosco])
    }

     return null
   }   

  const addAlfajor = async () => {
    setAddAlfajores(true)
  }

  const acceptAlfajor = () => {
    setCurrentMarker([])
    showKiosco({})
    setSearchQuery("")
    setError("")
  }

  const acceptKiosco = () => {
    setIsShowKiosco(false)
    showKiosco({})
    setSearchQuery("")
    setError("")
  }

  const createKiosco = async (alfajoresAdded: IAlfajorSelected[]) => {

    if (alfajoresAdded.filter(alf => alf.isSelected).length > 0) {

      setLoading(true)

      try {

        const newKiosco: IAddKiosco = {
          alfajores: alfajoresAdded.filter(alf => alf.isSelected),
          latitude: currentMarker[0][0],
          longitude: currentMarker[0][1],
          details,
          createdAt: new Date()
        }

        const kioscoCollection = collection(firestore, "kiosco")
        const docRef = await addDoc(kioscoCollection, newKiosco);
        const fetchedDoc = await getDoc(doc(firestore, "kiosco", docRef.id));

        if (fetchedDoc.exists()) {
          uploadKiosco({ id: fetchedDoc.id, ...fetchedDoc.data() })
          showKiosco({ id: fetchedDoc.id, ...fetchedDoc.data() })
          setError("Se ha creado correctamente")
        } else {
          console.log("Kiosco does not exists.");
        }

      } catch (error) {
        console.error("Error fetching kiosco:", error);
      } finally {
        setLoading(false)
      }
    }

    setDetails("")
    setAddAlfajores(false)
  }

  const updateKiosco = async (alfajoresAdded: IAlfajorSelected[]) => {

    if (alfajoresAdded.filter(alf => alf.isSelected).length !== kiosco.alfajores!.length &&
      !alfajoresAdded.filter(alf => alf.isSelected).every((elemento, index) => elemento === kiosco.alfajores![index])) {

      setLoading(true)

      try {

        const kioscoDocRef = doc(firestore, "kiosco", kiosco.id!)

        const kioscoDoc = await getDoc(kioscoDocRef)

        if (kioscoDoc.exists()) {

          const updatedKiosco = {
            alfajores: alfajoresAdded.filter(alf => alf.isSelected)
          }

          await updateDoc(kioscoDocRef, updatedKiosco)

          const updatedKioscoDoc = await getDoc(kioscoDocRef)

          if (updatedKioscoDoc.exists()) {

            const updatedKioscoData = { id: updatedKioscoDoc.id, ...updatedKioscoDoc.data() }

            showKiosco(updatedKioscoData)
            editKiosco(updatedKioscoData)
            setError("Se ha actualizado correctamente")

          } else {
            console.log("Kiosco does not exists");
          }

        } else {
          console.log("Kiosco does not exists");
        }

      } catch (error) {
        console.error("Error fetching kiosco:", error);
      } finally {
        setLoading(false)
      }

    }

    setAddAlfajores(false)
  }

  const getMarker = (marker: IKiosco) => {
    showKiosco(marker)
    setIsShowKiosco(true)
  }

  const handleComeback = () => {
    setError("")
    setCreateData("")
    setIsCreateAlfajor(false)
  }

  const openFormCreateAlfajor = () => {
    setIsCreateAlfajor(true)
    setError("")
  }

  const handleSearch = async (alf: string) => {

    setLoading(true)

    try {
      const kioscoCollection = collection(firestore, "kiosco");
      const snapshot = await getDocs(kioscoCollection);
      const data: IKiosco[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const filterData = data.filter((dataAlf) =>
        dataAlf.alfajores?.some((alfajor) =>
          alfajor.alfajor.toLowerCase().includes(alf.toLowerCase())
        )
      );

      setIsFiltered(true)
      showKioscos(filterData)

    } catch (error) {
      console.error("Error fetching kiosco data:", error);
    } finally {
      setLoading(false);
    }

    setSearchQuery("")
  }

  const removeFilter = async () => {

    setLoading(true)

    try {
      const kioscoCollection = collection(firestore, "kiosco")
      const snapshot = await getDocs(kioscoCollection);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      showKioscos(data)

    } catch (error) {
      console.error("Error fetching kiosco data:", error);
    } finally {
      setLoading(false)
    }

    setIsFiltered(false)

  }

  const handleCreateAlfajor = async () => {

    if (createData.length === 0) {
      setError("El campo se encuentra vacio")
      return
    }

    const alfajorStr = createData.split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ").trim();

    if (alfajorData.find((alf) => alf.alfajor === alfajorStr)) {
      setError("El alfajor ya se encuentra en la lista")
      return
    }

    setLoading(true)

    try {

      const newAlfajor: ICreateAlfajor = {
        alfajor: alfajorStr,
      }

      const alfajorCollection = collection(firestore, "alfajor")
      const docRef = await addDoc(alfajorCollection, newAlfajor);
      const fetchedDoc = await getDoc(doc(firestore, "alfajor", docRef.id));

      if (fetchedDoc.exists()) {
        setAlfajorData([...alfajorData, { id: fetchedDoc.id, alfajor: newAlfajor.alfajor }])
      } else {
        console.log("Alfajor does not exists.");
      }

    } catch (error) {
      console.error("Error creating alfajor:", error);
    } finally {
      setLoading(false)
    }

    setError("Se añadió un nuevo alfajor!")
    setCreateData("")
    setIsCreateAlfajor(false)

  }

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth))
    }
  }, [])

  useEffect(() => {

    const fetchKioscoData = async () => {
      try {
        const kioscoCollection = collection(firestore, "kiosco");
        const snapshot = await getDocs(kioscoCollection);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const alfajorCollection = collection(firestore, "alfajor");
        const snapshotAlfajor = await getDocs(alfajorCollection);
        const dataAlfajor = snapshotAlfajor.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAlfajorData(dataAlfajor as IAlfajor[]);

        showKiosco({})
        showKioscos(data)

      } catch (error) {
        console.error("Error fetching kiosco data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchKioscoData();
  }, [])

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {
        (!isShowKiosco && !addAlfajores && currentMarker.length === 0) &&
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      }
      {
        currentMarker.length > 0 && <CurrentMarker
          setDetails={setDetails} details={details}
          acceptAlfajor={acceptAlfajor} error={error}
          addAlfajor={addAlfajor} />
      }
      {
        addAlfajores && <AlfajoresList alfajores={alfajorData} createAlfajor={openFormCreateAlfajor}
          createKiosco={kiosco.id ? updateKiosco : createKiosco} kiosco={kiosco} error={error} />
      }
      {
        isShowKiosco && kiosco.id && <ShowKiosco kiosco={kiosco} error={error}
          acceptKiosco={acceptKiosco} addAlfajor={addAlfajor} />
      }
      {
        ((searchQuery.length > 0) && (!isShowKiosco && !addAlfajores && currentMarker.length === 0)) && <ResultSearch handleSearch={handleSearch}
          data={alfajorData.sort((a, b) => a.alfajor.localeCompare(b.alfajor))}
          searchQuery={searchQuery} />
      }
      {
        ((isFiltered) && (!isShowKiosco && !addAlfajores && currentMarker.length === 0)) && <button onClick={removeFilter}
          className="absolute z-10 top-20 left-20 p-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-500 text-white font-semibold cursor-pointer">
          Quitar filtros
        </button>
      }
      {
        ((zoom < 9) && (!isShowKiosco && !addAlfajores && currentMarker.length === 0)) &&
        <div className="absolute z-10 top-1/2 left-1/2 flex items-center justify-center" style={{
          transform: "translate(-50%, -50%)"
        }}>
          {
            width <= 768 ? <p className="text-red-500 text-amber-600 opacity-50 text-center select-none">
              Selecciona un negocio o Haz clic para localizar un nuevo
            </p> : <p className="text-red-500 text-amber-600 opacity-50 text-center select-none">
              Selecciona un negocio o Haz clic DERECHO para localizar un nuevo
            </p>
          }
        </div>
      }
      {
        isCreateAlfajor && <CreateAlfajorForm handleCreateAlfajor={handleCreateAlfajor}
          createData={createData} setCreateData={setCreateData} error={error}
          handleComeback={handleComeback} />
      }
      <MapContainer
        center={position}
        zoom={5}
        doubleClickZoom={false}
        attributionControl={false}
        className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          currentMarker.length > 0 && <Marker
            icon={customIcon}
            position={[currentMarker[0][0] as number, currentMarker[0][1] as number]}
          />
        }
        <AddMarkerOnClick />
        <ZoomDisplay />
        <RecenterAutomatically />
        {kioscos.map((marker) => {
          return <Marker
            icon={customIcon}
            eventHandlers={{
              click: () => {
                getMarker(marker)
              },
            }}
            key={marker.id}
            position={[marker.latitude as number, marker.longitude as number]}
          />
        })}
      </MapContainer>
    </div>
  );
};

export default App;
