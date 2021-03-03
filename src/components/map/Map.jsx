import React from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import PlaceIcon from '@material-ui/icons/Place';
import './map.css'

const LocationPin = ({ text }) => (
  <div className="pin">
    <PlaceIcon className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

function Map ({ location, zoomLevel }) {
  return (
  <Container className="map">
    {/* <Heading>
      Our National Parks  
    </Heading> */}
    {/* <h2 className="map-h2"></h2> */}

    <GoogleMap>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBqJxI-mD0WlcgOeHe-1h3JgHnAO9HoqaI" }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={"44.3386"}
          lng={"-68.2733"}
          text={"Acadia"}
        />
      </GoogleMapReact>
    </GoogleMap>
  </Container>
)
}

export default Map

const Container = styled.div`
  display: grid;
`

const Heading = styled.header`
  text-transform: uppercase;
  font-size: 1rem;
  padding: 20px;
  padding-left: 10px;
  text-align: center;
`

const GoogleMap = styled.div`
  width: 700px;
  height: 400px;
`

