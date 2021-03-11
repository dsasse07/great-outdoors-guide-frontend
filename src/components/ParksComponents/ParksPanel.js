import styled from 'styled-components'
import ParkSideBar from './ParkSideBar'
import ParkDescription from './ParkDescription'
import ParkLanding from './ParkLanding'
import ParkImages from './ParkImages'
import ParkDirections from './ParkDirections'
import ParkContact from './ParkContact'
import ParkWeather from './ParkWeather'
import { Switch, Route, useRouteMatch, useParams} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import ActiveParkContext from "../ActiveParkContext";

function ParksPanel() {
  const {activePark, handleActiveParkChange, nationalParks} = useContext(ActiveParkContext)
  const match = useRouteMatch()
  const params = useParams()

  const initialActivePark = nationalParks.filter( park => {
      return park.parkCode === params.parkCode
    })[0] 

    useEffect( () => {
      if (!activePark){
        handleActiveParkChange(initialActivePark)
      }
    })
  
  

  return ( 
    <Container>
      <SideBarContainer>
        <ParkSideBar activePark={activePark || initialActivePark} />
      </SideBarContainer>
      <Switch>
        <ParkWrapper>
          <ParkContainer>
            <Route exact path={`${match.url}/description`}>
                <ParkDescription />
            </Route>
            <Route exact path={`${match.url}/images`}>
                <ParkImages/>
            </Route>
            <Route exact path={`${match.url}/directions`}>
                <ParkDirections/>
            </Route>
            <Route exact path={`${match.url}/weather`}>
                <ParkWeather/>
            </Route>
            <Route exact path={`${match.url}/contact`}>
                <ParkContact/>
            </Route>
            <Route exact path={`${match.url}`}>
                <ParkLanding activePark={activePark || initialActivePark} />
            </Route>
          </ParkContainer>
        </ParkWrapper>
      </Switch>
    </Container>
  )

}


export default ParksPanel;

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
`

const ParkContainer = styled.main`
  grid-column: 2;
  max-width: 1350px;
  max-height: 1350px;
  min-width: 1000px;

`

const ParkWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`



