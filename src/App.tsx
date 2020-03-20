import React, { useState, useEffect } from "react";
import "./App.css";
import SimpleMap from "./components/SimpleMap";
import SidebarMap from "./components/SidebarMap";
import InputMap from "./components/InputMap";

function App() {
  const [location, setLocation] = useState([0, 0]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <>
      <InputMap />
      <SidebarMap />
      <SimpleMap location={location} />
    </>
  );
}

export default App;
