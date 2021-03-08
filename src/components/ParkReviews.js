import styled from 'styled-components'
import {useContext, useState} from 'react'
import ActiveParkContext from "./ActiveParkContext";

function ParkReviews() {
  const {activePark} = useContext(ActiveParkContext)
  const [sortBy, setSortBy] = useState("created_at")
  const reviews = [
    {score: 4, content: "It was Beautiful!", username: "Scuba Steve", created_at: 1615152249648000 },
    {score: 1, content: "I hate nature", username: "testUser", created_at: 1615152211284000}  
  ]

  const totalScore = reviews.reduce( (total, review) => {
    return total = total + review.score
  }, 0)

  const averageScore = totalScore / reviews.length

  return (
    <Container>
        <Header>
            <h1>{activePark?.fullName}</h1>
            <h2>Reviews</h2>
        </Header>
        <AvgScore>
            <p> Average User Rating : {averageScore} </p>
        </AvgScore>
        <ReviewsFilter>
          <p>Sort Reviews By :</p>
          <label>
            Rating
            <input type="radio" name="sort" value="rating"/>
          </label>
          <label>
            Newest First
            <input type="radio" name="sort" value="created_at"/>
          </label>
        </ReviewsFilter>
        <ReviewList>

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
  box-shadow: 0 0 7px 3px var(--yellow);
  color: var(--md-green);
  margin-right: 30px;
  
`

const Header = styled.header`
  margin-left: 50px;
  margin-right: 50px;
  text-align: center;
`

const AvgScore = styled.section`

`

const ReviewsFilter = styled.div``

const ReviewList = styled.ul``