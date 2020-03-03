import React, { useEffect } from "react";
import io from "socket.io-client";
var socket = io("http://127.0.0.1:8080");

const TweetList = () => {
  useEffect(() => {
    socket.on("stream", (msg: any) => {
      console.log(msg);
    });
  }, []);

  return <></>;
};

export default TweetList;
