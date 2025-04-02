"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface DeviceMapProps {
  device: any;
  showHistory: boolean;
  mapCenter: [number, number];
  formatDate: (date: string) => string;
}

export default function DeviceMap({
  device,
  showHistory,
  mapCenter,
  formatDate,
}: DeviceMapProps) {
  useEffect(() => {
    // Fix Leaflet icon issues
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Current location marker */}
      {!showHistory && device?.location && (
        <Marker position={[device.location.lat, device.location.lng]}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{device.name}</h3>
              <p className="text-sm">
                Last updated: {formatDate(device.lastUpdated)}
              </p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* History markers */}
      {showHistory &&
        (device?.history || []).map((entry: any, index: number) => (
          <Marker
            key={index}
            position={[entry.location.lat, entry.location.lng]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{device.name}</h3>
                <p className="text-sm">Time: {formatDate(entry.timestamp)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
