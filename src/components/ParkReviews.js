import styled from 'styled-components'
import {useContext, useState, useEffect} from 'react'
import ActiveParkContext from "./ActiveParkContext";
import Review from './Review'

function ParkReviews({currentUser}) {
  const {activePark} = useContext(ActiveParkContext)
  const [visits, setVisits] = useState([])
  const [sortBy, setSortBy] = useState({
    type:"score"
  })
  const noVisit = {
    review: "No Reviews have been left yet for this park.", username: ""
  }

  function fetchParkVisits(parkCode){
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/visits/reviews?code=${parkCode}`, {
    })
    .then( response => response.json() )
  }

  useEffect( () => {
    if (!activePark) return
    fetchParkVisits(activePark.parkCode).then( visitData =>{
      setVisits(visitData)
    })
  }, [activePark, currentUser])

    const totalScore = visits.length > 0 && (
      visits.reduce( (total, visit) => {
      return total = total + visit.score
    }, 0)
    )

  
  const averageScore = visits.length > 0 ? (totalScore / visits.length).toPrecision(3) : "--"

  function handleSortChange(event){
    const key = event.target.name
    const value = event.target.value
    const newSort = {...sortBy, [key]:value}
    setSortBy(newSort)
  }

  const sortedVisits = visits.length > 0 && visits?.sort( (visitA, visitB) => {
    if (sortBy.type === "created_at") return new Date(visitB[sortBy.type]) - new Date(visitA[sortBy.type])
    return visitB[sortBy.type] - visitA[sortBy.type]
  })

  const visitComponents = visits.length > 0 && sortedVisits.map( visit => {
    return <Review key={visit.id} visit={visit}/>
  })


  return (
    <Container>
        <Header>
            <h1>{activePark?.fullName}</h1>
            <h2>Reviews</h2>
        </Header>
        <AvgScore>
            Average User Rating <p>{averageScore} </p>
        </AvgScore>
        <SubHeading>
            <p>Sort Reviews By :</p>
          <ReviewsFilter>
            <div>
              <label>
                <input type="radio" name="type" value="score" onChange={handleSortChange} checked={sortBy.type ==="score"}/>
                Rating
              </label>
              <label>
                <input type="radio" name="type" value="created_at" onChange={handleSortChange} checked={sortBy.type === "created_at"}/>
                Most Recent
              </label>
            </div>
          </ReviewsFilter>
        </SubHeading>
        <ReviewList>
          {visits.length > 0 ? visitComponents : <Review visit={noVisit}/>}
        </ReviewList>

    </Container>
  )
}

export default ParkReviews

const Container = styled.div`
  height: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 7px 3px var(--lt-orange);
  color: var(--md-green);
  /* margin-right: 85px; */
  
`

const Header = styled.header`
  margin-left: 50px;
  margin-right: 50px;
  text-align: center;

  h1 {
    margin-bottom: 0;
  }

  h2 {
    margin-top: 0;
  }
`

const SubHeading = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--md-green);
  width: 90%;
  justify-content: space-between;

  p {
    font-weight: bold;
    padding-left: 5px;
  }
`

const AvgScore = styled.section`
  font-size: 16px;
  color: var(--md-green);
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-weight: bold;
    font-size: 20px;
    color: var(--orange);
    margin-top: 8px;
    margin-bottom: 0;
  }
`

const ReviewsFilter = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding-top: 10px;
  padding-bottom: 5px;
  justify-content: center;
  padding-right: 5px;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
  }
`

const ReviewList = styled.ul`
  height: 100%;
  overflow:scroll;
  width: 90%;
  padding-right: 10px;
  list-style-type: none;
  padding-inline-start: 10px;
  margin-top: 0;
`
