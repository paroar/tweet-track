import React, { useState, useContext, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { LocationContext } from "../context/LocationContext";
import Modal from "./Modal";
import Tweet from "./Tweet";
import { ClearContext } from "../context/ClearContext";

const greenIcon = L.icon({
  iconUrl: "./../img/green-marker.png",
  shadowUrl: "./../img//marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const redIcon = L.icon({
  iconUrl: "./../img/red-marker.png",
  shadowUrl: "./../img//marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const yellowIcon = L.icon({
  iconUrl: "./../img/yellow-marker.png",
  shadowUrl: "./../img//marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

type SimpleMapProps = {
  tweets: any[];
  clearStop: () => void
}

const SimpleMap: React.FC<SimpleMapProps> = (props) => {

  const { location } = useContext(LocationContext);
  const { clear } = useContext(ClearContext);


  const [modalInfo, setModalInfo] = useState({});
  const [isModalShowing, setIsModalShowing] = useState(false);

  useEffect(() => {
    props.clearStop();
  }, [clear]);

  const handleModal = (tweet: any) => {
    setModalInfo(tweet);
    setIsModalShowing(true);
  };

  const closeModal = () => {
    setIsModalShowing(false);
  };

  const handleIconColor = (n: number) => {
    if (n === 0) {
      return yellowIcon;
    } else if (n > 0) {
      return greenIcon;
    } else {
      return redIcon;
    }
  };

  return (
    <div>
      {isModalShowing ? (
        <Modal closeModal={closeModal}>
          <Tweet tweet={modalInfo} />
        </Modal>
      ) : null}
      <div id="mapid">
        <Map
          center={[location[0], location[1]]}
          zoom={3}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {props.tweets.map((t: any) => (
              <Marker
                position={[
                  t.place.bounding_box.coordinates[0][0][1],
                  t.place.bounding_box.coordinates[0][0][0]
                ]}
                key={t.id}
                icon={handleIconColor(t.sentiment)}
              >
                <Popup>
                  <div onClick={() => handleModal(t)}>{t.text}</div>
                </Popup>
              </Marker>
            ))}
        </Map>
      </div>
    </div>
  );
}

export default SimpleMap;
