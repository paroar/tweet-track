import React, { useState, useEffect, useContext } from "react";
import Svg from "./Svg";
import { ClearContext } from "../context/ClearContext";

const headers = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST"
}

const InputMap = () => {
  const [inputTopic, setInputTopic] = useState("");
  const [isPlay, setIsPlay] = useState(true);

  const { changeClear } = useContext(ClearContext);

  const handleInput = (input: string) => {
    const inputHeaders = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ topic: inputTopic })
    }
    setInputTopic(input.trim());
    fetch("http://localhost:8080/changeTopic", inputHeaders)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setIsPlay(true);
  }

  const handlePlay = () => {
    if (inputTopic !== "") {
      handleInput(inputTopic);
      fetch("http://localhost:8080/play", headers)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      setIsPlay(false);
    }
  }

  const handlePause = () => {
    fetch("http://localhost:8080/pause", headers)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setIsPlay(true);
  }

  const handleStop = () => {
    fetch("http://localhost:8080/stop", headers)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    handleInput("");
    changeClear();
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
        value={inputTopic}
        onChange={e => handleInput(e.target.value)}
      />
      <div className="input-btns">
        {isPlay ? (
          <span onClick={handlePlay} className="svgSpan">
            <Svg iconName="icon-controller-play" classType="controller-play" />
          </span>
        ) : (
            <span onClick={handlePause} className="svgSpan">
              <Svg iconName="icon-controller-paus" classType="controller-paus" />
            </span>
          )}
        {isPlay ?
          (
            <span onClick={handleStop} className="svgSpan">
              <Svg iconName="icon-controller-stop" classType="controller-paus" />
            </span>
          ) : (
            <span className="svgSpan">
              <Svg iconName="icon-controller-stop" color="lightgrey" classType="disabled"/>
            </span>
          )

        }

      </div>
    </div>
  );
};

export default InputMap;
