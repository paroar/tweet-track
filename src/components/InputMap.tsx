import React, { useState, useEffect, useContext } from "react";
import Svg from "./Svg";
import { ClearContext } from "../context/ClearContext";

const InputMap = () => {
  const [inputTopic, setInputTopic] = useState("");
  const [isPlay, setIsPlay] = useState(true);

  const { changeClear } = useContext(ClearContext);

  async function handleInput(input: string) {
    setInputTopic(input.trim());
    const res = await fetch(`http://localhost:8080/changeTopic?topic=${inputTopic}`);
    const data = await res.json();
    console.log(data);
    setIsPlay(true);
  }

  async function handlePlay() {
    if (inputTopic !== "") {
      handleInput(inputTopic);
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
    handleInput("");
    changeClear();
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
        value={inputTopic}
        onChange={e => handleInput(e.target.value)}
      />
      <div className="input-btns">
        {isPlay ? (
          <span onClick={handlePlay} className="svgSpan">
            <Svg iconName="icon-controller-play" class="controller-play"/>
          </span>
        ) : (
          <span onClick={handlePause} className="svgSpan">
            <Svg iconName="icon-controller-paus" class="controller-paus"/>
          </span>
        )}
        <span onClick={handleStop} className="svgSpan">
          <Svg iconName="icon-controller-stop" class="controller-paus"/>
        </span>
      </div>
    </div>
  );
};

export default InputMap;
