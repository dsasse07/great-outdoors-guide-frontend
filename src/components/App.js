// import './App.css';
import Map from './Map'
import InfoPanel from './InfoPanel'
import ParkList from './ParkList'
import styled from 'styled-components'
import {useState} from 'react'


function App() {
  const [nationalParks, setNationalParks] = useState([])
  const [activePark, setActivePark] = useState(null)
  const [zoom, setZoom] = useState(4)
  const [center, setCenter] = useState({
    lat: 44.5802,
    lng: -103.4617,
  })
 
  function handleSetParks(parkData){
    setNationalParks(parkData)
  }

  function handleActiveParkChange(park){
    setActivePark(park)
    setZoom(11)
    setCenter({lat: parseFloat(park.latitude), lng: parseFloat(park.longitude) })
    // history.push(`/${park.parkCode}`)
  }

  return (
    <Container>
      <HeaderContainer>
        Header
      </HeaderContainer>

      <MapContainer>
        <ParkList 
          nationalParks={nationalParks} 
          onActiveParkChange={handleActiveParkChange}
        />
        <Map 
          onFetchParks={handleSetParks} 
          onActiveParkChange={handleActiveParkChange}
          setZoom={setZoom}
          zoom={zoom}
          center={center}
        />  
      </MapContainer>

      <InfoDisplay >
        <InfoPanel activePark={activePark} />
      </InfoDisplay>

      <Footer>

      </Footer>

    </Container>
  );
} 

export default App;

const Container = styled.div`
  display: grid;
  grid-template-rows: 100px auto 1fr 50px;
  height: 100vh;
  grid-gap: 15px;
`

const HeaderContainer = styled.header`
  grid-row: 1;
  background: pink;
`

const MapContainer = styled.section`
  grid-row: 2;
  background: pink;
  display: flex;
  justify-content: center;
  height: 400px;
`

const InfoDisplay = styled.section`
  grid-row: 3;
  background: pink;
`

const Footer = styled.footer`
  grid-row: 4;
  background: pink;
`