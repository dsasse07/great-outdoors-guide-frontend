import React from 'react'
import styled from 'styled-components'
import JournalSideBar from './JournalSideBar'
import JournalMain from './JournalMain'
import { Switch, Route, useRouteMatch, useParams} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import ActiveParkContext from "../ActiveParkContext";

function JournalPanel({currentUser}) {
  const [hasVisited, setHasVisited] = useState(false)
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

    // useEffect(() => {
    //   checkHasVisited()
    // }, [activePark])

    // function checkHasVisited() {
    //   setHasVisited(
    //     currentUser.trips.includes(trip => trip.parkCode === activePark.parkCode)
    //   )
    // }


    function handleOnVisit(){

    }

  return (
    <Container>
      <SideBarContainer>
        <JournalSideBar currentUser={currentUser} hasVisited={hasVisited}/>
      </SideBarContainer>
      <Switch>
          <ParkContainer>
            <Route exact path={`${match.url}/images`}>
                {/* <Images/> */}
            </Route>
            <Route exact path={`${match.url}/review`}>
                {/* <Review/> */}
            </Route>
            <Route exact path={`${match.url}`}>
                <JournalMain 
                  hasVisited={hasVisited} 
                  onVisit={handleOnVisit}
                  currentUser={currentUser}
                />
            </Route>
          </ParkContainer>
      </Switch>
    </Container>
  )
}

export default JournalPanel

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