import React, {useContext} from 'react'
import styled from 'styled-components'
import {badges} from '../../assets/national-park-badges/badges'
import ActiveParkContext from "../ActiveParkContext";

function ProfileBadges({currentUser}) {
  const {nationalParks} = useContext(ActiveParkContext)
  const visitComponents = currentUser.visits.map( visit => {
    return (
      <VisitContainer>
        <BackgroundImage>
        </BackgroundImage>
          <Badge src={badges[visit.code]} alt={getParkName(visit.code)} />
      </VisitContainer>

    )
  })

function getParkName(code){
  const parkMatch = nationalParks.filter( park => {
    return park.parkCode === code
  })[0]
  return parkMatch.fullName
}

  return (
    <Container>
      <Header>
        <h1>Your Logged Visits</h1>
      </Header>
      <VisitsShell>
        {visitComponents}
      </VisitsShell>
    </Container>
  )
}

export default ProfileBadges

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

`

const Header = styled.header` 
  text-shadow: 2px 2px 8px var(--lt-orange);
  color: var(--md-green);
`

const VisitsShell = styled.div`
  max-height: calc(100vh - 300px);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding-top: 20px;
`
const VisitContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0 0 3px 3px gray;
  border-radius: 8px;
  width: 90%;
  padding: 6px;

  img{
    max-height: 200px;
  }

  h3 {
    margin: 0;
    padding: 0;
  }
`

const Badge = styled.img``

const BackgroundImage = styled.img``