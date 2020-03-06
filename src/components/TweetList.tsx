import React from "react";
import io from "socket.io-client";
import Tweet from "./Tweet";
var socket = io("http://127.0.0.1:8080");

interface TweetListInterface {
  tweets: any[];
}

class TweetList extends React.Component<{}, TweetListInterface> {
  constructor(props: any) {
    super(props);
    this.state = { tweets: [] };
  }
  componentDidMount() {
    socket.on("stream", (msg: any) => {
      this.setState({ tweets: [msg, ...this.state.tweets.slice(0, 5)] });
    });
  }

  render() {
    return (
      <>
        {this.state.tweets.map(t => (
          <Tweet tweet={t} />
        ))}
      </>
    );
  }
}

export default TweetList;
