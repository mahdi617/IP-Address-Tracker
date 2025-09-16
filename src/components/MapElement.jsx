import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import useIpData from "../hooks/useIpData.js";
import markerPng from "../assets/icon-location.svg";

function Recenter({ lat, lng }) {
  const map = useMap();
  if (lat && lng) map.setView([lat, lng], map.getZoom(), { animate: true });
  return null;
}

const myIcon = new L.Icon({
  iconUrl: markerPng,
  iconRetinaUrl: markerPng,
  iconSize: [32, 45],
  popupAnchor: [0, -20],
});

export default function MapElement({ ipQuery }) {
  const { center } = useIpData(ipQuery);
  if (!center) return <div className="map-wrap" />;

  return (
    <div className="map-wrap">
      <div className="map-container">
        <MapContainer center={center} zoom={13} scrollWheelZoom zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center} icon={myIcon} />
          <Recenter lat={center[0]} lng={center[1]} />
        </MapContainer>
      </div>
    </div>
  );
}
