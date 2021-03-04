import React, {useState, useEffect, useContext} from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ActiveParkContext from "./ActiveParkContext";

const containerStyle = {
  width: '700px',
  height: '400px'
};

function MyComponent({onFetchParks}) {
  const {zoom, center, handleActiveParkChange, setZoom} = useContext(ActiveParkContext)
  const [markers, setMarkers] = useState([])

  useEffect( () => {
    fetch(`https://developer.nps.gov/api/v1/parks?limit=475&api_key=${process.env.REACT_APP_PARKS_API_KEY}` )
      .then( response => response.json() )
      .then( parksJSON => {
        const nationalParks = parksJSON.data.filter( park => {
          return park.designation === "National Park" || park.designation === "National Park & Preserve" || park.name === "National Park of American Samoa" || park.designation=== "National Park and Preserve" || park.designation=== "National and State Parks" || park.designation=== "National Parks"
        }) 
        const markerArray= nationalParks.map((park)=> {
          return(<Marker onClick={() => {handleMarkerClick(park)}} key={park.id} position={ {lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) }}/>)
        })
        onFetchParks(nationalParks)    
        setMarkers(markerArray) 
      })
  }, [])

  function handleMarkerClick(park){
    handleActiveParkChange(park)
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
        {markers}

      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)