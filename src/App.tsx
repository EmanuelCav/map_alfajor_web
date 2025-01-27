import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {

  const position: [number, number] = [-34.6083, -58.3712]

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <MapContainer center={position} zoom={5} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Aquí estás.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
