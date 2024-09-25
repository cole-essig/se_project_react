import React, {useState} from "react";
import './ToggleSwitch.css';

function ToggleSwitch() {
    const [currentTempUnit, setToggleUnitSwitch] = useState("F");
    const handleToggleChange = (e) => {
        if(currentTempUnit === 'C') {
            setToggleUnitSwitch('F')
        } else {
            setToggleUnitSwitch('C')
        }
        console.log(currentTempUnit);
    }

return  (
    <label className="toggle">
        <input type="checkbox" className="toggle__checkbox" onChange={handleToggleChange}/>
        <span className={currentTempUnit === 'F' ? "toggle__slider toggle__switch-F" : "toggle__slider toggle__switch-C"}></span>
        <p className={currentTempUnit === 'C' ? "toggle__F toggle__active_F" : "toggle__F"}>F</p>
        <p className={currentTempUnit === 'F' ? "toggle__C toggle__active_C" : "toggle__C"}>C</p>
    </label>
)
}

export default ToggleSwitch;