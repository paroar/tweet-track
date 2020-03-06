import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import io from "socket.io-client";
import Svg from "./Svg";
var socket = io("http://127.0.0.1:8080");

interface TweetListInterface {
  tweets: any[];
}

class SimpleMap extends Component<{}, TweetListInterface> {
  constructor(props: any) {
    super(props);
    this.state = { tweets: [] };
  }

  defaultProps = {
    center: {
      lat: 40.476924,
      lng: -3.857556
    },
    zoom: 10
  };

  componentDidMount() {
    socket.on("stream", (msg: any) => {
      if (msg.place) {
        this.setState({ tweets: [...this.state.tweets, msg] });
      }
    });
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={this.defaultProps.center}
          defaultZoom={this.defaultProps.zoom}
        >
          {this.state.tweets.map(t => (
            <Svg
              lat={t.place.bounding_box.coordinates[0][0][1]}
              lng={t.place.bounding_box.coordinates[0][0][0]}
              iconName="icon-location-pin"
              svgFill={t.color}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
