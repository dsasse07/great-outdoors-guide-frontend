import './App.css';
// import MapSection from './components/map/Map' // import the map here
import Map from './components/maps2/Map'
import styled from 'styled-components'
function App() {


  const centerLocation = {
    lat: 44.5802,
    lng: -103.4617,
  }
 

  return (
    <Container>
      <HeaderContainer>
        Header
      </HeaderContainer>

      <MapContainer>
        <Map/>
        {/* <MapSection location={centerLocation} zoomLevel={2} style={{flex: 1}}/> include it here */}
      </MapContainer>

      <InfoDisplay>
        Info Panel
      </InfoDisplay>

      <Footer>
      <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1HqnoIntFl6D9k50J_zfYjXrvSnB7cXTu" width="640" height="480"></iframe>
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
`

const InfoDisplay = styled.section`
  grid-row: 3;
  background: pink;
`

const Footer = styled.footer`
  grid-row: 4;
  background: pink;
`