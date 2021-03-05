// import './App.css';
import Map from './Map'
import Header from './Header'
import InfoPanel from './InfoPanel'
import ParkList from './ParkList'
import styled from 'styled-components'
import {useState} from 'react'
import {Switch, Route } from 'react-router-dom'
import ActiveParkProvider from './ActiveParkProvider'
import '../fonts/NationalPark-Regular.otf'; 

function App() {
  const [nationalParks, setNationalParks] = useState([])

  function handleSetParks(parkData){
    setNationalParks(parkData)
  }

  return (
    <Container>
      <HeaderContainer>
        <Header/>
      </HeaderContainer>
      <ActiveParkProvider>
        <MapContainer>
          <ParkList nationalParks={nationalParks} />
          <Map onFetchParks={handleSetParks} />  
        </MapContainer>

        <InfoDisplay >
          <Switch>
            <Route path='/parks/:parkCode'>
              <InfoPanel />
            </Route>
            <Route exact path='/parks'>
              Select a Park
            </Route>
          </Switch>
        </InfoDisplay>
      </ActiveParkProvider>
      <Footer>
        Footer
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
  justify-content: space-between;
  height: 400px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
`

const InfoDisplay = styled.section`
  grid-row: 3;
  background: pink;
`

const Footer = styled.footer`
  grid-row: 4;
  background: pink;
`