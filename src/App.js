import React, { useState } from "react";
import TrackingPage from "./TrackingPage";

function App() {
  const [sessionId, setSessionId] = useState("");

  return (
    <div>
      <h1>Karoo Tracker</h1>
      <input
        type="text"
        placeholder="Enter Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      {sessionId && <TrackingPage sessionId={sessionId} />}
    </div>
  );
}

export default App;
