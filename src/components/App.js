// import './App.css';
import Map from './Map'
import Header from './Header'
import ParksPanel from './ParksComponents/ParksPanel'
import ParkReviews from './ParkReviews'
import JournalPanel from './JournalComponents/JournalPanel'
import ParkList from './ParkList'
import Login from './Login'
import styled from 'styled-components'
import {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import ActiveParkProvider from './ActiveParkProvider'
import '../fonts/NationalPark-Regular.otf'; 

function App() {
  const [nationalParks, setNationalParks] = useState([])
  const [currentUser, setCurrentUser] = useState(false)
  const [viewMode, setViewMode] = useState('parks')
  const token = localStorage.getItem("token");
  
  function handleSetParks(parkData){
    setNationalParks(parkData)
  }

  // 
  useEffect(() => {

    if (token) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((r) => r.json())
      .then((user) => {
        setCurrentUser(user);
      });
    }
  }, [token]);

  return (
    <Container>
      <ActiveParkProvider>
      <HeaderContainer>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} onViewModeChange={setViewMode}/>
      </HeaderContainer>

      <Switch>   
{/* *********************************************************** */}
{/* ***************        Login Route       ****************** */}
{/* *********************************************************** */}
        <Route exact path='/login'>
            <Login setViewMode={setViewMode} setCurrentUser={setCurrentUser}/>
        </Route> 
{/* *********************************************************** */}
{/* ***************        Journal Mode       ***************** */}
{/* *********************************************************** */}
        <Route path='/journal'>
          {currentUser && 
          <>
            <MapContainer>
              <ParkList nationalParks={nationalParks} viewMode={viewMode} />
              <Map onFetchParks={handleSetParks} viewMode={viewMode}/>  
            </MapContainer>
            <JournalDisplay>
              <Route exact path='/journal/:parkCode'>
                <JournalPanel currentUser={currentUser}/>
              </Route>
              <Route exact path='/journal'>
                Journal Default
              </Route>
            </JournalDisplay>
          </>
          // : <Redirect to='/login' />
          }
        </Route>
{/* *********************************************************** */}
{/* ***************        Parks Mode       ******************* */}
{/* *********************************************************** */}
          <Route path='/parks'>
            <MapContainer>
              <ParkList nationalParks={nationalParks} viewMode={viewMode} />
              <Map onFetchParks={handleSetParks} viewMode={viewMode}/>
              <ParkReviews />  
            </MapContainer>
            <InfoDisplay >
              <Route path='/parks/:parkCode'>
                <ParksPanel />
              </Route>
              <Route exact path='/parks'>
                Select a Park
              </Route>
            </InfoDisplay>
          </Route>
{/* *********************************************************** */}
{/* ***************        Root Route      ******************* */}
{/* *********************************************************** */}
          <Route exact path = '/'>
            Main About Page
          </Route>
        )
      </Switch>

      <Footer>
        Footer 
      </Footer>
    </ActiveParkProvider>
    </Container>
  );
} 

export default App;

const Container = styled.div`
  display: grid;
  grid-template-rows: 120px auto auto 50px;
  height: 100%;
  background: var(--md-green);
  /* grid-gap: 15px; */
`

const HeaderContainer = styled.header`
  grid-row: 1;
`

const MapContainer = styled.section`
  grid-row: 2;
  background: var(--md-green);
  display: flex;
  justify-content: space-between;
  gap: 25px;
  height: 400px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
`

const InfoDisplay = styled.section`
  grid-row: 3;
  height: 100%;
`

const Footer = styled.footer`
  grid-row: 4;
  background: mistyrose;
`
const JournalDisplay = styled.section`
  grid-row: 3;
`