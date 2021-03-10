import React from 'react'
import styled from 'styled-components'
import JournalSideBar from './JournalSideBar'
import JournalMain from './JournalMain'
import JournalPage from './JournalPage'
import JournalReview from './JournalReview'
import JournalImages from './JournalImages'
import { Switch, Route, useRouteMatch, useParams} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import ActiveParkContext from "../ActiveParkContext";

function JournalPanel({currentUser, setCurrentUser}) {
  const [visit, setVisit] = useState(false)
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

    useEffect ( () => {
      setVisit(
        currentUser.visits.filter(visit => visit.code === activePark?.parkCode)[0]
      )
    }, [currentUser, activePark])


    function handleVisitUpdate(updatedVisit){
      const updatedVisits = currentUser.visits.map( visit => {
        if (visit.id !== updatedVisit.id) return visit
        return updatedVisit
      })
      setCurrentUser({...currentUser, visits: updatedVisits})
    }

    function handleImageDelete(updatedVisit) {
      const newVisitsArray = currentUser.visits.map( visit => {
        if (visit.id !== updatedVisit.id) return visit
        return updatedVisit
      })
      setCurrentUser( {...currentUser, visits: newVisitsArray} )
    }

    function handleDeleteVisit(id){
      const updatedVisits = currentUser.visits.filter( (visit) => (
        visit.id !== id ))
      setCurrentUser({...currentUser, visits: updatedVisits})
      
    }
    
 
  return (
    <Container>
      <SideBarContainer>
        <JournalSideBar handleDeleteVisit={handleDeleteVisit} currentUser={currentUser} visit={visit}/>
      </SideBarContainer>
      <Switch>
        <JournalWrapper>
          <JournalContainer>
            <Route exact path={`${match.url}/images`}>
                <JournalImages currentUser={currentUser} visit={visit} onImageDelete={handleImageDelete} onImageSubmit={handleVisitUpdate}/>
            </Route>
            <Route exact path={`${match.url}/review`}>
                <JournalReview onVisitUpdate={handleVisitUpdate} currentUser={currentUser} visit={visit}/>
            </Route>
            <Route exact path={`${match.url}`}>
              { !visit ? 
                <JournalMain 
                  visit={visit} 
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setVisit={setVisit}
                />
              : <JournalPage currentUser={currentUser} visit={visit} onVisitUpdate={handleVisitUpdate} /> 
            }
            </Route>
          </JournalContainer>
        </JournalWrapper>
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

const JournalContainer = styled.main`
  grid-column: 2;
  max-width: 1350px;
  max-height: 1350px;
  
`

const JournalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
