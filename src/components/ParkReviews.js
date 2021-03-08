import styled from 'styled-components'
import {useContext, useState} from 'react'
import ActiveParkContext from "./ActiveParkContext";
import Review from './Review'

function ParkReviews() {
  const {activePark} = useContext(ActiveParkContext)
  const [sortBy, setSortBy] = useState({
    type:"rating",
    order: "asc"
  })
  const reviews = [
    {id: 1, score: 1, content: "It was Beautiful!", username: "Scuba Steve", created_at: 1615152249648 },
    {id: 2, score: 4, content: "I hate nature", username: "testUser", created_at: 1615152211284},  
    {id: 3, score: 2, content: "I like Turtles", username: "Joey", created_at: 1615161477128}  
  ]

  const totalScore = reviews.reduce( (total, review) => {
    return total = total + review.score
  }, 0)

  const averageScore = (totalScore / reviews.length).toPrecision(3)

  function handleSortChange(event){
    const key = event.target.name
    const value = event.target.value
    const newSort = {...sortBy, [key]:value}
    setSortBy(newSort)
  }

  const sortedReviews = reviews.sort( (reviewA, reviewB) => {
    if (sortBy.order === "asc") return reviewA[sortBy.type] - reviewB[sortBy.type]
    return reviewB[sortBy.type] - reviewA[sortBy.type]
  })

  const reviewComponents = reviews.map( review => {
    return (
      <Review key={review.id} review={review}/>
    )
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
                <input type="radio" name="type" value="rating" onChange={handleSortChange} checked={sortBy.type ==="rating"}/>
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
          {reviewComponents}
        </ReviewList>

    </Container>
  )
}

export default ParkReviews

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 7px 3px var(--lt-orange);
  color: var(--md-green);
  margin-right: 85px;
  
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
