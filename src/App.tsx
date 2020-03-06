import React from "react";
import "./App.css";
import SimpleMap from "./components/SimpleMap";
import SidebarMap from "./components/SidebarMap";

function App() {
  return (
    <>
      <div className="input">
        <input className="topic" type="text" placeholder="Topic..." />
      </div>
      <SidebarMap />
      <SimpleMap />
    </>
  );
}

export default App;
