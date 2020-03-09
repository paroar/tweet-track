import React, { useState, useEffect } from "react";
import Svg from "./Svg";

const InputMap = () => {
  const [state, setstate] = useState("");
  const [isPlay, setIsPlay] = useState(true);

  async function handleFetch(e: string) {
    setstate(e);
    const res = await fetch(`http://localhost:8080/changeTopic?topic=${state}`);
    const data = await res.json();
    console.log(data);
    setIsPlay(true);
  }

  async function handlePlay() {
    handleFetch(state);
    const res = await fetch(`http://localhost:8080/play`);
    const data = await res.json();
    console.log(data);
    setIsPlay(false);
  }

  async function handlePause() {
    const res = await fetch(`http://localhost:8080/pause`);
    const data = await res.json();
    console.log(data);
    setIsPlay(true);
  }

  useEffect(() => {
    handlePause();
  }, []);

  return (
    <div className="input">
      <input
        className="topic"
        type="text"
        placeholder="Topic..."
        value={state}
        onChange={e => handleFetch(e.target.value)}
      />
      <div>
        {isPlay ? (
          <span onClick={handlePlay}>
            <Svg iconName="icon-controller-play" class="controller-play" />
          </span>
        ) : (
          <span onClick={handlePause}>
            <Svg iconName="icon-controller-paus" class="controller-paus" />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputMap;
