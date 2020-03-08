import React, { useState, useEffect } from "react";

const InputMap = () => {
  const [state, setstate] = useState("coronavirus");

  async function handleFetch() {
    const res = await fetch(`http://localhost:8080/changeTopic?topic=${state}`);
    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    handleFetch();
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
