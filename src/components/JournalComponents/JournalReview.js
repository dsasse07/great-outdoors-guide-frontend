import React from 'react'
import styled from 'styled-components'
import {badges} from '../../assets/national-park-badges/badges';
import ActiveParkContext from "../ActiveParkContext"
import {useContext, useState} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import  Modal  from './Modal';
import { useRouteMatch, useHistory} from 'react-router-dom'



function JournalReview({currentUser, visit, onVisitUpdate}) {
    const {activePark} = useContext(ActiveParkContext)
    const {id, review, score, created_at} = visit
    const DateString = new Date(created_at).toDateString().slice(4)
    const randomIndex = Math.floor(Math.random() * activePark?.images.length)
    const [isShown,setisShown] = useState(false)
    const history = useHistory();
    const match = useRouteMatch();
    const featuredImages = (visit.images && visit.images.length > 0) ? visit.images : activePark?.images
    const [formData, setFormData] = useState({
      review: review,
      score: score,
    })
    function randomItemFromArray(array){
      const randomIndex = Math.floor(Math.random() * array.length)
      return array[randomIndex]
    }
    function handleEdit(event){
      setisShown(isShown => !isShown)
    }
    
    const handleSubmit = (event) => {
      event.preventDefault(event);
      console.log(formData);
      console.log(visit);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/visits/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( formData )
    })
        .then(response => response.json())
        .then(updatedVisit => {
          onVisitUpdate(updatedVisit)
        })
  
        handleEdit(event)
        history.push(`${match.url}`)
      };

    function handleChangeReview(event){
      const name = event.target.name;
      let value = event.target.value;
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    if (activePark ) {
    return (
        <Container>
          <TextContainer >
              <Title>
                {activePark.fullName }
              </Title>
              <SubTitle>
                <h2> {DateString} </h2>
                <EditContainer onClick={handleEdit}>
                  <button > 
                    Edit 
                    <EditIcon />
                  </button>
                </EditContainer>
              </SubTitle>
              <Review>
                {review}
              </Review>
              {isShown && (
        <Modal isShown={isShown} toggle={handleEdit}>
          <h1>Edit Your Review</h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
              type="text"
              name="review"
              value={formData.review}
              onChange={(e) => handleChangeReview(e)}
            />
            <br />
            <label htmlFor="score">Rate Your Visit: {formData.score}</label>
            <input
              id="score"
              type="range"
              name="score"
              onChange={(e) => handleChangeReview(e)}
              value={formData.score}
              min="1"
              max="5"
              step="1"
            />
            <br />
           <input type="submit" value="Update your Review"/>
           <br />
           <button onClick={handleEdit}>Cancel</button>
          </form>
        </Modal>
      )}
          </TextContainer>
        <ImageContainer>
        <img src={randomItemFromArray(featuredImages).url} alt={activePark?.fullName}></img>
        </ImageContainer>
      </Container>
    )
    } else {
      return null
    }
}

export default JournalReview;

const Container = styled.div`
  position: relative;
  width: 100%;
`

const ImageContainer = styled.div`
  width: auto;
  img{
    width: 100%;
  } 
`

const TextContainer = styled.main`
  position: absolute;
  top: 30px;
  z-index: 2;
  color: white;
  background: rgba(43, 43, 43, 60%);
  width: 100%;
  padding-bottom: 5px;
  padding-top: 5px;
`

const Title = styled.h1`
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 0;
`

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 75px;
  padding-right: 75px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    text-align: center;
  }
`

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--md-green);
  padding: 4px;
  border-radius: 8px;

  button {
    display: flex;
    align-items: center;
    background: transparent;
    border: 1px solid var(--yellow);
    text-align: center;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 8px;
    color: var(--yellow);
    font-size: 1.25rem;
  }
  :hover{
    background: var(--yellow);
    button{
      color: var(--md-green);
      border: 1px solid var(--md-green);
    }
  }
  svg{
    font-size: 1.5rem;
  }
`

const Review = styled.h3`
margin-top: 10px;
font-size: 1.4rem;
text-align: center;
margin-left: 50px;
margin-right: 50px;
`


