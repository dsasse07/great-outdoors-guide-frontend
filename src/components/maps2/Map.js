import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ExploreIcon from '@material-ui/icons/Explore';

const containerStyle = {
  width: '700px',
  height: '400px'
};

const center = {
  lat: 44.5802,
  lng: -103.4617,
};

function MyComponent() {

  function fetchParkLocations(){
    fetch("https://developer.nps.gov/api/v1/parks?limit=475&api_key=pZv5Z7M0OLQg4fbPDdRQ0pnVFYUIEOIWL0fNZhuX" )
      .then( response => response.json() )
      .then( parksJSON => {
        // console.log(parksJSON)
        const nationalParks = parksJSON.data.filter( park => {
          return park.designation === "National Park"
        }) 
        console.log(nationalParks)
      })

  }

  fetchParkLocations()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBqJxI-mD0WlcgOeHe-1h3JgHnAO9HoqaI"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{  lat: 40.5802, lng: -95.4617 }}
        zoom={4}
        // onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={ {lat:44.3386, lng:-68.2733} }/>
        { /* Child components, such as markers, info windows, etc. */ }

      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)