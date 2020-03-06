import React from "react";
import "./App.css";
import TweetList from "./components/TweetList";
import SimpleMap from "./components/SimpleMap";

function App() {
  return (
    <div className="App">
      <div>
        <TweetList />
      </div>
      <SimpleMap />
    </div>
  );
}

export default App;
