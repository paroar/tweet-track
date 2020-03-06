import React, { Component } from "react";
import io from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
var socket = io("http://127.0.0.1:8080");

interface TweetListInterface {
  tweets: any[];
}

class SimpleMap extends Component<{}, TweetListInterface> {
  constructor(props: any) {
    super(props);
    this.state = { tweets: [] };
  }

  componentDidMount() {
    socket.on("stream", (msg: any) => {
      if (msg.place) {
        this.setState({ tweets: [...this.state.tweets, msg] });
      }
    });
  }

  location = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("POS", position);
    });
  };

  render() {
    this.location();
    return (
      <div>
        <div id="mapid">
          <Map center={[0, 0]} zoom={2}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {this.state.tweets.map(t => (
              <Marker
                position={[
                  t.place.bounding_box.coordinates[0][0][1],
                  t.place.bounding_box.coordinates[0][0][0]
                ]}
              >
                <Popup>
                  <a href="">{t.text}</a>
                </Popup>
              </Marker>
            ))}
          </Map>
        </div>
      </div>
    );
  }
}

export default SimpleMap;
