import styled from 'styled-components'
import SideBar from './SideBar'
import ParkDescription from './ParkDescription'
import ParkLanding from './ParkLanding'
import Images from './Images'
import { Switch, Route, useRouteMatch, useParams} from 'react-router-dom'
import {useContext} from 'react'
import ActiveParkContext from "./ActiveParkContext";

function InfoPanel({activePark}) {
  // const {activePark} = useContext(ActiveParkContext)
  const match = useRouteMatch()

  // const {nationalParks} = useContext(ActiveParkContext)
  // const params = useParams()

  // const activePark = nationalParks.filter( park => {
  //   debugger
  //   return park.parkCode === params.parkCode
  // })
// console.log('activePark', activePark)
// console.log('params', params)
  return ( 
    <Container>
      <SideBarContainer>
        <SideBar activePark={activePark} />
      </SideBarContainer>
      <Switch>
          <ParkContainer>
            <Route exact path={`${match.url}/description`}>
                <ParkDescription  activePark={activePark}/>
            </Route>
            <Route exact path={`${match.url}/images`}>
                <Images activePark={activePark}/>
            </Route>
            <Route exact path={`${match.url}`}>
                <ParkLanding activePark={activePark} />
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



