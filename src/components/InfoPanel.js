import styled from 'styled-components'
import SideBar from './SideBar'
import ParkDescription from './ParkDescription'
import ParkLanding from './ParkLanding'
import Images from './Images'
import Directions from './Directions'
import Contact from './Contact'
import Weather from './Weather'
import { Switch, Route, useRouteMatch, useParams} from 'react-router-dom'
import {useContext} from 'react'
import ActiveParkContext from "./ActiveParkContext";

function InfoPanel() {
  const {activePark, handleActiveParkChange, nationalParks} = useContext(ActiveParkContext)
  const match = useRouteMatch()
  const params = useParams()

  const initialActivePark = nationalParks.filter( park => {
      return park.parkCode === params.parkCode
    })[0] 

  if (!activePark){
    handleActiveParkChange(initialActivePark)
  }
  

  return ( 
    <Container>
      <SideBarContainer>
        <SideBar activePark={activePark || initialActivePark} />
      </SideBarContainer>
      <Switch>
          <ParkContainer>
            <Route exact path={`${match.url}/description`}>
                <ParkDescription />
            </Route>
            <Route exact path={`${match.url}/images`}>
                <Images/>
            </Route>
            <Route exact path={`${match.url}/directions`}>
                <Directions/>
            </Route>
            <Route exact path={`${match.url}/weather`}>
                <Weather/>
            </Route>
            <Route exact path={`${match.url}/contact`}>
                <Contact/>
            </Route>
            <Route exact path={`${match.url}`}>
                <ParkLanding activePark={activePark || initialActivePark} />
            </Route>
          </ParkContainer>
      </Switch>
    </Container>
  )

}


export default InfoPanel;

const Container = styled.div`
  display: grid;
  grid-template-columns: 360px 1fr;
  grid-gap: 30px;
  height: 100%;
  padding-left: 10px;
  padding-right: 20px;
`

const SideBarContainer = styled.aside`
  grid-column: 1;
  /* background: gray; */

`

const ParkContainer = styled.main`
  grid-column: 2;
  background: gray;
  width: auto;
`



