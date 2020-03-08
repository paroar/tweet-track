import React, { useState, useEffect } from "react";

const InputMap = () => {
  const [state, setstate] = useState("coronavirus");

  useEffect(() => {
    fetch("http://localhost:8080/changeTopic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic: state })
    });
  }, [state]);

  const handleInput = (e: string) => {
    setstate(e);
  };

  return (
    <div className="input">
      <input
        className="topic"
        type="text"
        placeholder="Topic..."
        value={state}
        onChange={e => handleInput(e.target.value)}
      />
    </div>
  );
};

export default InputMap;
