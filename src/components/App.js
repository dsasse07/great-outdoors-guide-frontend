// import './App.css';
import Map from './Map'
import Header from './Header'
import ParksPanel from './ParksComponents/ParksPanel'
import ParkReviews from './ParkReviews'
import JournalPanel from './JournalComponents/JournalPanel'
import PanelPlaceHolder from './PanelPlaceholder'
import ProfileContainer from './ProfileComponents/ProfileContainer'
import ParkList from './ParkList'
import Login from './Login'
import Footer from './Footer'
import Root from './Root'
import DelayedRedirect from './DelayedRedirect'
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
          {currentUser ?
          <>
            <MapContainer>
              <ParkList nationalParks={nationalParks} viewMode={viewMode} />
              <Map onFetchParks={handleSetParks} viewMode={viewMode} currentUser={currentUser}/>  
              <ParkReviews currentUser={currentUser}/>  
            </MapContainer>
            <JournalDisplay>
              <Route path='/journal/:parkCode'>
                <JournalPanel currentUser={currentUser} setCurrentUser={setCurrentUser}/>
              </Route>
              <Route exact path='/journal'>
                <PanelPlaceHolder text={"Welcome to your Travel Journal"} >
                  <h2>Select a National Park to begin </h2>
                  <h2>You may use the search bar to the left, or select the park from the map</h2> 
                  <h2>After selecting a park you will be able to write a journal, upload photos, and review the park</h2>
                </PanelPlaceHolder>
              </Route>
            </JournalDisplay>
          </>
          : <DelayedRedirect />
          }
        </Route>
{/* *********************************************************** */}
{/* ***************        Parks Mode       ******************* */}
{/* *********************************************************** */}
          <Route path='/parks'>
            <MapContainer>
              <ParkList nationalParks={nationalParks} viewMode={viewMode} />
              <Map onFetchParks={handleSetParks} viewMode={viewMode} currentUser={currentUser}/>
              <ParkReviews />  
            </MapContainer>
            <InfoDisplay >
              <Route path='/parks/:parkCode'>
                <ParksPanel />
              </Route>
              <Route exact path='/parks'>
                <PanelPlaceHolder text={"Welcome to the Parks Explorer"} >
                  <h2>Select a National Park to begin </h2>
                  <h2>You may use the search bar to the left, or select the park from the map</h2> 
                  <h2>Selecting a park will display its available information</h2>
                </PanelPlaceHolder>
              </Route>
            </InfoDisplay>
          </Route>
{/* *********************************************************** */}
{/* ***************        Profile Mode       ******************* */}
{/* *********************************************************** */}
          <Route path='/profile'>
            <ProfileContainer>
              {/* <Route path='/profile'>
                <ParksPanel />
              </Route>
              <Route exact path='/parks'>
                <PanelPlaceHolder text={"Welcome to the Parks Explorer"} >
                  <h2>Select a National Park to begin </h2>
                  <h2>You may use the search bar to the left, or select the park from the map</h2> 
                  <h2>Selecting a park will display its available information</h2>
                </PanelPlaceHolder>
              </Route> */}
            </ProfileContainer>
          </Route>
{/* *********************************************************** */}
{/* ***************        Root Route      ******************* */}
{/* *********************************************************** */}
          <Route exact path = '/'>
            <Root />
          </Route>
        )
      </Switch>

      <FooterContainer>
        <Footer />
      </FooterContainer>
    </ActiveParkProvider>
    </Container>
  );
} 

export default App;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 50px;
  height: 100%;
  background: var(--md-green);
  grid-gap: 15px;
`

const HeaderContainer = styled.header`
  grid-row: 1;
  border-bottom: 2px solid var(--yellow);
`

const MapContainer = styled.section`
  grid-row: 2;
  background: var(--md-green);
  display: flex;
  justify-content: space-evenly;
  /* flex-wrap: wrap; */
  gap: 25px;
  min-height: 400px;
  padding-top: 15px;
  padding-bottom: 15px;
  /* padding-left: 10px; */
`

const InfoDisplay = styled.section`
  grid-row: 3;
  height: 100%;
  margin-top: 20px;
`

const FooterContainer = styled.footer`
  grid-row: 4;
  height: 100%;
  display: flex;
  background: var(--white);
  color: var(--md-green);  
`
const JournalDisplay = styled.section`
  grid-row: 3;
  height: 100%;
  margin-top: 20px;
`