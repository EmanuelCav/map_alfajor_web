import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firestore } from '../firebase.config'

import CurrentMarker from "./app/components/CurrentMarker";
import AlfajoresList from "./app/components/AlfajoresList";
import ShowKiosco from "./app/components/ShowKiosco";

import { generalStore } from "./app/server/store";

import { IAddKiosco, IKiosco } from "./app/interface/Kiosco";
import { IAlfajor, IAlfajorSelected } from "./app/interface/Alfajor";

const Map = () => {

  const position: [number, number] = [-34.6083, -58.3712]

  const { showKioscos, kioscos, showKiosco, kiosco, uploadKiosco, editKiosco } = generalStore()

  const [loading, setLoading] = useState<boolean>(true)
  const [addAlfajores, setAddAlfajores] = useState<boolean>(false)
  const [isShowKiosco, setIsShowKiosco] = useState<boolean>(false)
  const [isCreateAlfajor, setIsCreateAlfajor] = useState<boolean>(false)

  const [error, setError] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const [alfajorData, setAlfajorData] = useState<IAlfajor[]>([])
  const [currentMarker, setCurrentMarker] = useState<[number, number][]>([])

  const AddMarkerOnClick = () => {
    const map = useMapEvents({
      contextmenu: (e) => {
        const { lat, lng } = e.latlng
        setCurrentMarker([[lat, lng]])
        map.flyTo([lat, lng], 18)
      }
    })

    return null
  }

  const addAlfajor = async () => {
    setAddAlfajores(true)
  }

  const acceptAlfajor = () => {
    setCurrentMarker([])
    showKiosco({})
  }

  const acceptKiosco = () => {
    setIsShowKiosco(false)
    showKiosco({})
  }

  const createKiosco = async (alfajoresAdded: IAlfajorSelected[]) => {

    if (alfajoresAdded.filter(alf => alf.isSelected).length > 0) {

      setLoading(true)

      try {

        const newKiosco: IAddKiosco = {
          alfajores: alfajoresAdded.filter(alf => alf.isSelected),
          latitude: currentMarker[0][0],
          longitude: currentMarker[0][1],
          createdAt: new Date()
        }

        const kioscoCollection = collection(firestore, "kiosco")
        const docRef = await addDoc(kioscoCollection, newKiosco);
        const fetchedDoc = await getDoc(doc(firestore, "kiosco", docRef.id));

        if (fetchedDoc.exists()) {
          uploadKiosco({ id: fetchedDoc.id, ...fetchedDoc.data() })
          showKiosco({ id: fetchedDoc.id, ...fetchedDoc.data() })
        } else {
          console.log("Kiosco does not exists.");
        }

      } catch (error) {
        console.error("Error fetching kiosco:", error);
      } finally {
        setLoading(false)
      }
    }

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
      <></>
    );
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {
        currentMarker.length > 0 && <CurrentMarker
          acceptAlfajor={acceptAlfajor}
          addAlfajor={addAlfajor} />
      }
      {
        addAlfajores && <AlfajoresList alfajores={alfajorData} createAlfajor={() => setIsCreateAlfajor(true)}
          createKiosco={kiosco.id ? updateKiosco : createKiosco} kiosco={kiosco} error={error} />
      }
      {
        isShowKiosco && kiosco.id && <ShowKiosco kiosco={kiosco}
          acceptKiosco={acceptKiosco} addAlfajor={addAlfajor} />
      }
      <MapContainer center={position} zoom={5}
        doubleClickZoom={false}
        className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          currentMarker.length > 0 && <Marker
            position={[currentMarker[0][0] as number, currentMarker[0][1] as number]}
          />
        }
        <AddMarkerOnClick />
        {kioscos.map((marker) => {
          return <Marker
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

export default Map;
