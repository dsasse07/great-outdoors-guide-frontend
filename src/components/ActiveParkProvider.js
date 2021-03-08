import React, { useState, useEffect } from "react";
import ActiveParkContext from "./ActiveParkContext";

const ActiveParkProvider = ({ children }) => {
  const [activePark, setActivePark] = useState(null)
  const [nationalParks, setNationalParks] = useState([])
  const [zoom, setZoom] = useState(4)
  const [center, setCenter] = useState({
    lat: 44.5802,
    lng: -103.4617,
  })
  
  useEffect( () => {
    fetch(`https://developer.nps.gov/api/v1/parks?limit=475&api_key=${process.env.REACT_APP_PARKS_API_KEY}` )
      .then( response => response.json() )
      .then( parksJSON => {
        const nationalParks = parksJSON.data.filter( park => {
          return isNationalPark(park)
        }) 
        setNationalParks(nationalParks)    
      })
  }, [])
  
  function isNationalPark(park){
    return (
        park.designation === "National Park" || 
        park.designation === "National Park & Preserve" || 
        park.name === "National Park of American Samoa" || 
        park.designation=== "National Park and Preserve" || 
        park.designation=== "National and State Parks" || 
        park.designation=== "National Parks"
    )
  }

  function handleActiveParkChange(park){
    if (!park) return
    setActivePark(park)
    setZoom(11)
    setCenter({lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) })
  }

  function resetOnLogout(){
    setActivePark(null)
    setZoom(4)
    setCenter({
      lat: 44.5802,
      lng: -103.4617,
    })
  }

  return (
    <ActiveParkContext.Provider 
      value={ {
        activePark, 
        zoom, 
        center, 
        handleActiveParkChange, 
        setZoom, 
        setNationalParks, 
        nationalParks,
        setActivePark,
        resetOnLogout
        }}
      >
      {children}
    </ActiveParkContext.Provider>
  );
};
export default ActiveParkProvider;