import React, { Component } from "react";
import io from "socket.io-client";
import RingChart from "./RingChart";
var socket = io("http://127.0.0.1:8080");

interface SidebarMapInterface {
  count: number;
  good: number;
  bad: number;
  neutral: number;
}

class SidebarMap extends Component<{}, SidebarMapInterface> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0, good: 0, bad: 0, neutral: 0 };
  }

  componentDidMount() {
    socket.on("count", (msg: any) => {
      this.setState({
        count: msg.count,
        good: msg.good,
        bad: msg.bad,
        neutral: msg.neutral
      });
    });
  }

  percentages = () => {
    let good = Math.round((this.state.good / this.state.count) * 100);
    let bad = Math.round((this.state.bad / this.state.count) * 100);
    let neutral = Math.round((this.state.neutral / this.state.count) * 100);
    return [good, bad, neutral];
  };

  render() {
    return (
      <div className="sidebarMap">
        <RingChart data={this.percentages()} />
      </div>
    );
  }
}

export default SidebarMap;
