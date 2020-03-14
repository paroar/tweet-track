import React from "react";
import io from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Modal from "./Modal";
import Tweet from "./Tweet";
import L from "leaflet";
var socket = io("http://127.0.0.1:8080");
type SimpleMapsProps = {
  location: number[];
};

class SimpleMap extends React.Component<SimpleMapsProps> {
  state = {
    tweets: [] as any[],
    modalInfo: {},
    isModalShowing: false
  };

  componentDidMount() {
    socket.on("tweets", (msg: any) => {
      if (msg.place) {
        this.setState({ tweets: [...this.state.tweets, msg] });
      }
    });
  }

  handleModal = (tweet: any) => {
    this.setState({
      modalInfo: tweet,
      isModalShowing: true
    });
    console.log(tweet);
  };

  closeModal = () => {
    console.log("closing");
    this.setState({
      isModalShowing: false
    });
  };

  greenIcon = L.icon({
    iconUrl: "./../img/green-marker.png",
    shadowUrl: "./../img//marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  redIcon = L.icon({
    iconUrl: "./../img/red-marker.png",
    shadowUrl: "./../img//marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  yellowIcon = L.icon({
    iconUrl: "./../img/yellow-marker.png",
    shadowUrl: "./../img//marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  handleIconColor = (n: number) => {
    if (n === 0) {
      return this.yellowIcon;
    } else if (n > 0) {
      return this.greenIcon;
    } else {
      return this.redIcon;
    }
  };

  render() {
    return (
      <div>
        {this.state.isModalShowing ? (
          <Modal closeModal={this.closeModal}>
            <Tweet tweet={this.state.modalInfo} />
          </Modal>
        ) : null}
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
                icon={this.handleIconColor(t.sentiment.score)}
              >
                <Popup>
                  <div onClick={() => this.handleModal(t)}>{t.text}</div>
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
