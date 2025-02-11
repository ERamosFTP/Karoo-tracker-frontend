import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

const TrackingPage = ({ sessionId }) => {
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/track/${sessionId}/`);
        setTrackingData(response.data);
      } catch (error) {
        console.error("Error fetching tracking data:", error);
      }
    };

    fetchTrackingData();
    const interval = setInterval(fetchTrackingData, 5000); // Refresh every 5 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, [sessionId]);

  if (!trackingData) return <p>Loading tracking data...</p>;

  return (
    <div>
      <h2>Tracking Session: {sessionId}</h2>
      <p>Heart Rate: {trackingData.hr} bpm</p>
      <p>Power: {trackingData.power} W</p>

      <MapContainer center={trackingData.gps} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={trackingData.gps}>
          <Popup>Rider's Live Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TrackingPage;
