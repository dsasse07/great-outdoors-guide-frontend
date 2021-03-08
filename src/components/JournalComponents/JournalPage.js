import styled from 'styled-components'
import {useContext} from 'react'
import ActiveParkContext from "../ActiveParkContext";




function JournalPage({currentUser}) {
  const {activePark} = useContext(ActiveParkContext)
  const randomIndex = Math.floor(Math.random() * activePark?.images.length)

  if (activePark ) {
    return (
      <Container>
          <TextContainer>
              <h1>{currentUser.fullName }</h1>
              <h2> Description </h2>
              <h3>{activePark.description}</h3>
          </TextContainer>
        <ImageContainer>
          <img src={activePark.images[randomIndex].url} alt={activePark.images[randomIndex].altText}></img>
        </ImageContainer>
      </Container>
    )
    } else {
      return null
    }
}

export default JournalPage;

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

  h1 {
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 0;
  }

  h2 {
    margin-top: 10px;
    font-size: 2.5rem;
    text-align: center;
  }

  h3 {
    margin-top: 10px;
    font-size: 1.4rem;
    text-align: center;
    margin-left: 50px;
    margin-right: 50px;
  }
`