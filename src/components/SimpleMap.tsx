import React from "react";
import io from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
var socket = io("http://127.0.0.1:8080");

type SimpleMapsProps = {
  location: number[];
};

class SimpleMap extends React.Component<SimpleMapsProps> {
  state = {
    tweets: [] as any[]
  };

  componentDidMount() {
    socket.on("tweets", (msg: any) => {
      if (msg.place) {
        this.setState({ tweets: [...this.state.tweets, msg] });
      }
    });
  }

  render() {
    return (
      <div>
        <div id="mapid">
          <Map
            center={[this.props.location[0], this.props.location[1]]}
            zoom={3}
          >
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
                key={t.id}
              >
                <Popup>{t.text}</Popup>
              </Marker>
            ))}
          </Map>
        </div>
      </div>
    );
  }
}

export default SimpleMap;
