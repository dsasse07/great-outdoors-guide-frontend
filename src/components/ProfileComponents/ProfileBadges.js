import React, {useContext} from 'react'
import styled from 'styled-components'
import {badges} from '../../assets/national-park-badges/badges'
import ActiveParkContext from "../ActiveParkContext";

function ProfileBadges({currentUser}) {
  const {nationalParks} = useContext(ActiveParkContext)
  const badgeComponents = nationalParks.map( ({parkCode, fullName}) => {
    const displayName = [
      parkCode !== "npsa" ? fullName.match(/(^.*)(N.*)/)[1] : "National Park of",
      parkCode !== "npsa" ? fullName.match(/(^.*)(N.*)/)[2] : "American Samoa"
    ]
    const hasVisit = currentUser.visits.filter( visit => {
      return visit.code === parkCode
    }).length > 0

    return (
      { component : (
          <BadgeContainer hasVisit = {hasVisit}>
              <img src={badges[parkCode]} alt={fullName}/>
              <h3>{displayName[0]}</h3>
              <h3>{displayName[1]}</h3>
          </BadgeContainer> 
          ),
        hasVisit: hasVisit
    }
    )
  })

  const visitedComponents = badgeComponents.filter ( badge => {
    return badge.hasVisit === true
  })
  const unvisitedComponents = badgeComponents.filter ( badge => {
    return badge.hasVisit === false
  })
  const sortedComponents = [...visitedComponents, ...unvisitedComponents]

  return (
    <Container>
      <Header>
        <h1>Your Park Badges</h1>
      </Header>
      <Thumbnails>
      {sortedComponents.map( badge => badge.component)}

      </Thumbnails>
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

const Thumbnails = styled.div`
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
const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 3px 3px gray;
  border-radius: 8px;
  width: fit-content;
  padding: 6px;
  opacity: ${({hasVisit}) => hasVisit ? "100%" : "20%"};

  img{
    max-height: 200px;
  }

  h3 {
    margin: 0;
    padding: 0;
  }
`