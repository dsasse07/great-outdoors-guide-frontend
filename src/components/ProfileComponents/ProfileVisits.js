import React, {useContext} from 'react'
import styled from 'styled-components'
import {badges} from '../../assets/national-park-badges/badges'
import ActiveParkContext from "../ActiveParkContext";
import {Link} from 'react-router-dom'

function ProfileBadges({currentUser}) {
  const {nationalParks} = useContext(ActiveParkContext)
  const visitComponents = currentUser?.visits?.map( visit => {
    const matchingPark = getPark(visit.code)
    const backgroundImage = visit.images.length > 0 ? visit.images[0].url : matchingPark.images[0].url
    const DateString = new Date(visit.created_at).toDateString().slice(4)

    return (
      <VisitContainer to={`/journal/${visit.code}`}>
        <BackgroundContainer>
          <BackgroundImage src={backgroundImage} alt={matchingPark.fullName} />
        </BackgroundContainer>
        <Badge src={badges[visit.code]} alt={`Badge for ${matchingPark.fullName}`} />
        <TextShell>
          <TextContainer>
            <h1>{matchingPark.fullName}</h1> 
            <Subtitle>
              <h3>{DateString}</h3>
              <h3>Rating : {visit.score}</h3>
            </Subtitle>
          </TextContainer>
        </TextShell>
      </VisitContainer>

    )
  })

function getPark(code){
  const parkMatch = nationalParks.filter( park => {
    return park.parkCode === code
  })[0]
  return parkMatch
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
  max-height: calc(100vh - 350px);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding-top: 20px;
`
const VisitContainer = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0 0 3px 3px gray;
  border-radius: 8px;
  width: 90%;
  overflow:hidden;
  height: 180px;
  transition: 0.2s;
  cursor: pointer;

  h3 {
    margin: 0;
    padding: 0;
  }

  :hover {
    height: 200px;
    width: 95%;
  }
`

const Badge = styled.img`
  max-height: 170px;
  z-index: 1;
`


const BackgroundContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100;
`
const BackgroundImage = styled.img`
  width: 100%;
`

const TextShell = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  background: rgba(43, 43, 43, 70%);
  display: flex;
  align-content: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
`

const TextContainer = styled.main`
  top: 30px;
  color: white;
  /* background: rgba(43, 43, 43, 70%); */
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;

  h1 {
    margin: 0;
  }
`

const Subtitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`