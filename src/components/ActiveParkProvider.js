import React, { useState } from "react";
import ActiveParkContext from "./ActiveParkContext";

const ActiveParkProvider = ({ children }) => {
  const [activePark, setActivePark] = useState(null)
  const [nationalParks, setNationalParks] = useState([])
  const [zoom, setZoom] = useState(4)
  const [center, setCenter] = useState({
    lat: 44.5802,
    lng: -103.4617,
  })

  function handleActiveParkChange(park){
    setActivePark(park)
    setZoom(11)
    setCenter({lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) })
  }

  return (
    <ActiveParkContext.Provider value={ {activePark, zoom, center, handleActiveParkChange, setZoom, setNationalParks, nationalParks} }>
      {children}
    </ActiveParkContext.Provider>
  );
};
export default ActiveParkProvider;