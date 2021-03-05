import React, {useContext} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ActiveParkContext from "./ActiveParkContext";
import {useHistory} from 'react-router-dom'

const containerStyle = {
  width: '700px',
  height: '400px'
};

function Map({}) {

  const history = useHistory()
  const {zoom, center, handleActiveParkChange, setZoom, nationalParks} = useContext(ActiveParkContext)

  const markerArray= nationalParks.map((park)=> {
    return(<Marker onClick={() => {handleMarkerClick(park)}} key={park.id} position={ {lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) }}/>)
    })

  function handleMarkerClick(park){
    handleActiveParkChange(park)
    history.push(`/parks/${park.parkCode}`)
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
        {/* <Marker position={ {lat:44.3386, lng:-68.2733} }/> */}
        {markerArray}

      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)