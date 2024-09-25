import React from "react";

const CurrentTempUnitContext = React.createContext({
    currentTempUnit: "",
    handleTempToggleChange: () => {}
});

export {CurrentTempUnitContext};