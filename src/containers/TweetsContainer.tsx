import React from "react";
import SimpleMap from "../components/SimpleMap";
import io from "socket.io-client";
const socket = io("http://127.0.0.1:8080");


class TweetsContainer extends React.Component {

  state = {
    tweets: [] as any[],
    clear: this.context.clear
  };
  
  componentDidMount() {
    socket.on("tweets", (msg: any) => {
      if (msg.place) {
        this.setState({ tweets: [...this.state.tweets, msg].slice(-100) });
      }
    });
  }

  clearStop() {
    this.setState({tweets : []});
  }

  render() {
    console.log(this.state.tweets);
    return (
      <><SimpleMap tweets={this.state.tweets} clearStop={() => this.clearStop()}/></>
    );
  }
}

export default TweetsContainer;
