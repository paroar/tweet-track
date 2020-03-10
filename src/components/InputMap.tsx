import React, { useState, useEffect } from "react";
import Svg from "./Svg";

const InputMap = () => {
  const [state, setstate] = useState("");
  const [isPlay, setIsPlay] = useState(true);

  async function handleFetch(e: string) {
    setstate(e.trim());
    const res = await fetch(`http://localhost:8080/changeTopic?topic=${state}`);
    const data = await res.json();
    console.log(data);
    setIsPlay(true);
  }

  async function handlePlay() {
    if (state !== "") {
      handleFetch(state);
      const res = await fetch(`http://localhost:8080/play`);
      const data = await res.json();
      console.log(data);
      setIsPlay(false);
    }
  }

  async function handlePause() {
    const res = await fetch(`http://localhost:8080/pause`);
    const data = await res.json();
    console.log(data);
    setIsPlay(true);
  }

  async function handleStop() {
    const res = await fetch(`http://localhost:8080/stop`);
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
      <div className="input-btns">
        {isPlay ? (
          <span onClick={handlePlay} className="svgSpan">
            <Svg iconName="icon-controller-play" class="controller-play" />
          </span>
        ) : (
          <span onClick={handlePause} className="svgSpan">
            <Svg iconName="icon-controller-paus" class="controller-paus" />
          </span>
        )}
        <span onClick={handleStop} className="svgSpan">
          <Svg iconName="icon-controller-stop" class="controller-paus" />
        </span>
      </div>
    </div>
  );
};

export default InputMap;