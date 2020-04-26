import React, { useState } from "react";

export interface ClearContextInterface {
    clear: boolean;
    changeClear:() => void;
}

const ClearContext = React.createContext<ClearContextInterface>({
    clear: false,
    changeClear: () => {}
});

const ClearContextProvider: React.FC = (props) => {

    const [clear, setClear] = useState(false);

    const changeClear = () => {
        setClear(!clear);
    }

    return (
        
        <ClearContext.Provider
            value={{
                clear,
                changeClear
            }}
        >
            {props.children}
        </ClearContext.Provider>
    );
};

const ClearContextConsumer = ClearContext.Consumer;

export { ClearContext, ClearContextProvider, ClearContextConsumer };
