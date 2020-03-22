import React from "react";
import "./App.css";
import TweetsContainer from "./containers/TweetsContainer";
import SidebarMap from "./components/SidebarMap";
import InputMap from "./components/InputMap";

function App() {
  return (
    <>
        <InputMap />
        <SidebarMap />
        <TweetsContainer/>
    </>
  );
}

export default App;
