import React from 'react'
import styled from 'styled-components'
import {badges} from '../../assets/national-park-badges/badges';
import ActiveParkContext from "../ActiveParkContext"
import {useContext, useState, useEffect} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import  Modal  from './Modal';
import { useRouteMatch, useHistory} from 'react-router-dom'



function JournalReview({currentUser, visit, onVisitUpdate}) {
  const {activePark} = useContext(ActiveParkContext)
  const {id, review, score, created_at} = visit
  const history = useHistory();
  const match = useRouteMatch();
  const [loading, setLoading] = useState(false)
  const [isShown,setisShown] = useState(false)
  const [displayImage, setDisplayImage] = useState({})
  const [formData, setFormData] = useState({
    review: review,
    score: score,
  })
  const [errors, setErrors] = useState([]);
  const errorComponents = errors && ( errors.map((error) => {
    return (
      <p key={error} style={{ color: "red" }}>
        {error}
      </p>
    )}
))

  const loadingComponent = loading && (
  <p style={{ color: "var(--teal)" }}>
  Loading...
  </p>
  ) 
  const featuredImages = (visit.images && visit.images.length > 0) ? visit.images : activePark?.images
  const DateString = new Date(created_at).toDateString().slice(4)
  
  useEffect ( () => {
    if (!featuredImages) return
    const randomIndex = Math.floor(Math.random() * featuredImages.length)
    setDisplayImage( featuredImages[randomIndex] )
  }, [currentUser, featuredImages])

  function handleEdit(event){
    setisShown(isShown => !isShown)
  }
  
  const handleSubmit = (event) => {
    const token = localStorage.getItem("token");
    setLoading(true)
    event.preventDefault(event);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/visits/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify( formData )
  })
      .then(response => response.json())
      .then(updatedVisit => {
        setLoading(false)
        onVisitUpdate(updatedVisit)
      })
      .catch((data) => {
        setLoading(false)
        setErrors(data.errors);
      });
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
    <>
      <Container>
        <TextContainer >
          <Header>
            <BadgeContainer>
              <img src={badges[activePark.parkCode]} alt={activePark.parkCode}/>
              <h2> {DateString} </h2>
            </BadgeContainer> 
            <Title>
              {activePark.fullName }
            </Title>
            <EditContainer onClick={handleEdit}>
              <button > 
                Edit 
                <EditIcon />
              </button>
            </EditContainer>
          </Header>
          <Review>
            {review}
          </Review>
        </TextContainer>
        <ImageContainer>
        <img src={displayImage.url} alt={activePark?.fullName}></img>
        </ImageContainer>
      </Container>

      {isShown && (
      <Modal isShown={isShown} toggle={handleEdit}>

        <Form onSubmit={(e) => handleSubmit(e)}>
        <h1>Edit Your Review</h1>
          <textarea
            type="text"
            name="review"
            value={formData.review}
            onChange={(e) => handleChangeReview(e)}
          />
          <label htmlFor="score">Rate Your Visit - {formData.score}</label>
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
          {loadingComponent}
          {errorComponents}
          <input type="submit" disabled={loading} value="Update your Review"/>
        </Form>
      </Modal>
    )}
    </>
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
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: auto;
    max-width: 100%;
    max-height: 1000px;
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
  max-height: 90%;
  overflow: scroll;
`

const Title = styled.h1`
  font-size: 3.5rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    text-align: center;
  }
`

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 3px solid white; */
  padding-top: 15px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--md-green);
  font-size: 1.5rem;
  width: 90%;
  gap: 15px;
  
  h1{
    text-shadow: 2px 2px 4px var(--lt-orange);
  }

  input  {
    font-size: 18px;
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    border: 1px solid var(--yellow);
    outline: none;
    padding: 8px;
  }

  textarea{
    width: 95%;
    padding: 15px;
    font-size: 1.15rem;
    border-radius: 8px;
    box-shadow: 0 0 5px 2px var(--lt-orange);
    background: var(--md-green);
    color: var(--yellow);
    border: var(--yellow);
    min-height: 150px;
    margin-bottom: 8px;
    max-height: 400px;
    max-width: 105%;
  }

  label {
    font-size: 1.75rem;
  }

  input[type="range"] {
    width: 50%;
  }

  input[type="submit"] {
    cursor: pointer;
    
    :hover {
      background: var(--yellow);
      color: var(--md-green);
    }
  }
`

