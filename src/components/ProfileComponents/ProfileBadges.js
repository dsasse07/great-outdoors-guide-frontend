import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {badges} from '../../assets/national-park-badges/badges'
import ActiveParkContext from "../ActiveParkContext";

function ProfileBadges({currentUser}) {
  const {nationalParks} = useContext(ActiveParkContext)
  const [sortBy, setSortBy] = useState({
    type:"name"
  })
  const badgeComponents = nationalParks.map( ({parkCode, fullName}) => {
    const displayName = [
        parkCode !== "npsa" ? fullName.match(/(^.*)(N.*)/)[1] : "National Park of",
        parkCode !== "npsa" ? fullName.match(/(^.*)(N.*)/)[2] : "American Samoa"
    ]
    const thisVisit = currentUser.visits.filter( visit => {
      return visit.code === parkCode
    })[0]
    const createdAt = thisVisit?.created_at

    return (
      { component : (
          <BadgeContainer hasVisit = {thisVisit}>
              <img src={badges[parkCode]} alt={fullName}/>
              <h3>{displayName[0]}</h3>
              <h3>{displayName[1]}</h3>
          </BadgeContainer> 
          ),
        hasVisit: !!thisVisit,
        name: fullName,
        created: createdAt
    }
    )
  })
  function handleSortChange(event){
    const key = event.target.name
    const value = event.target.value
    const newSort = {...sortBy, [key]:value}
    setSortBy(newSort)
  }

  const visitedComponents = badgeComponents.filter ( badge => {
    return badge.hasVisit === true
  })
  const unvisitedComponents = badgeComponents.filter ( badge => {
    return badge.hasVisit === false
  })
  const sortedVisitedComponents = visitedComponents.sort( (visitA, visitB) => {

    if (sortBy.type === "created") return new Date(visitB[sortBy.type]) - new Date(visitA[sortBy.type])
    // return visitB[sortBy.type] - visitA[sortBy.type]
  })
  const sortedComponents = [...sortedVisitedComponents, ...unvisitedComponents]
  

  return (
    <Container>
      <Header>
        <h1>Your Park Badges</h1>
      </Header>
      <SubHeading>
            <p>Sort Badges By :</p>
          <BadgeFilter>
            <div>
              <label>
                <input type="radio" name="type" value="name" onChange={handleSortChange} checked={sortBy.type ==="name"}/>
                Name
              </label>
              <label>
                <input type="radio" name="type" value="created" onChange={handleSortChange} checked={sortBy.type === "created"}/>
                Most Recent
              </label>
            </div>
          </BadgeFilter>
        </SubHeading>
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
  max-height: calc(100vh - 400px);
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
const SubHeading = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--md-green);
  width: 90%;
  justify-content: space-between;
  font-size: 1.5rem;
  p {
    font-weight: bold;
    padding-left: 5px;
  }
`

const BadgeFilter = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 5px;
  justify-content: center;
  padding-right: 5px;
  flex-direction: column;
  font-size: 1.3rem;
  div {
    display: flex;
    flex-direction: column;
  }
`
