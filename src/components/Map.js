import React, {useContext} from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';
import ActiveParkContext from "./ActiveParkContext";
import {useHistory} from 'react-router-dom'
import {badgeMed} from '../assets/national-park-badges/badges';


const containerStyle = {
  width: '700px',
  height: '400px'
};

function Map({viewMode, currentUser}) {
  const history = useHistory()
  const {zoom, center, handleActiveParkChange, setZoom, nationalParks} = useContext(ActiveParkContext)

  function userVisited (parkCode) {
    return currentUser?.visits?.filter(visit => visit.code === parkCode).length > 0
  }
  
  const options = {
    imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', 
  }
 
  const markerArray = (
      <MarkerClusterer options={options}>
      {(clusterer) =>
        nationalParks.map((park)=> {
          return (
            <Marker 
              onClick={() => {handleMarkerClick(park)}} 
              key={park.id} 
              position= {{
                lat: parseFloat(park.latitude), 
                lng: parseFloat(park.longitude) 
              }}
              icon={userVisited(park.parkCode) ? badgeMed[park.parkCode] : ""}
              clusterer={clusterer}
            />
          )   
        })
      }
      </MarkerClusterer>
  )


  function handleMarkerClick(park){
    handleActiveParkChange(park)
    history.push(`/${viewMode}/${park.parkCode}`)
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${process.env.REACT_APP_MAPS_API_KEY}`
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  function handleZoomChange(){
    map && setZoom(map.zoom)
  }

  
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onZoomChanged={ handleZoomChange }
      >
          {markerArray}
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)


