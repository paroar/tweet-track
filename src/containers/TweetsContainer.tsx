import React from "react";
import SimpleMap from "../components/SimpleMap";
import io from "socket.io-client";
const socket = io("http://127.0.0.1:8080");

type TweetType = {
  id: string,
  id_str: string,
  name: string,
  screen_name: string,
  profile_image_url: string,
  description: string,
  sentiment: number,
  text: string,
  place?: number[][][]
}

type TweetTypeWithPlace = {
  id: string,
  id_str: string,
  name: string,
  screen_name: string,
  profile_image_url: string,
  description: string,
  sentiment: number,
  text: string,
  place: number[][][]
}

class TweetsContainer extends React.Component {

  state = {
    tweets: [] as TweetTypeWithPlace[],
    clear: this.context.clear
  };
  
  componentDidMount() {
    socket.on("tweets", (msg: TweetType) => {
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
