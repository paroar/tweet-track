import React, { useState, useEffect } from "react";

export interface LocationContextInterface {
    location: number[];
}

const LocationContext = React.createContext<LocationContextInterface>({
    location: []
});

const LocationContextProvider: React.FC = (props) => {

    const [location, setLocation] = useState([0, 0]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLocation([position.coords.latitude, position.coords.longitude]);
            console.log(position.coords)
        });
    }, []);

    return (
        
        <LocationContext.Provider
            value={{
                location
            }}
        >
            {props.children}
        </LocationContext.Provider>
    );
};

const LocationContextConsumer = LocationContext.Consumer;

export { LocationContext, LocationContextProvider, LocationContextConsumer };
