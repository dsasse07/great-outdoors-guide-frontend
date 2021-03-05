import styled from 'styled-components'
import SideBar from './SideBar'
import ParkDescription from './ParkDescription'
import ParkLanding from './ParkLanding'
import Images from './Images'
import { Switch, Route, useRouteMatch, useParams} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import ActiveParkContext from "./ActiveParkContext";

function InfoPanel() {
  const {activePark, setActivePark, nationalParks} = useContext(ActiveParkContext)
  // const [loaded, setLoaded] = useState(!!activePark)
  const match = useRouteMatch()
  const params = useParams()
  // console.log('loaded', loaded)
  const [initialActivePark, setInitialActivePark] = useState(
    nationalParks.filter( park => {
      return park.parkCode === params.parkCode
    })[0] 
  )
    // setActivePark(initialActivePark[0])
    console.log('park set to ', initialActivePark )
  // }, [])

  console.log('params', params)

  return ( 
    <Container>
      <SideBarContainer>
        <SideBar activePark={activePark || initialActivePark} />
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



