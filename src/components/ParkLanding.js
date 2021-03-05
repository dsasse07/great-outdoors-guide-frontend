import React from 'react'
import {useContext} from 'react'
import ActiveParkContext from "./ActiveParkContext";
import styled from 'styled-components'

function ParkLanding() {
  const {activePark} = useContext(ActiveParkContext)

  if (activePark ) {
  return (
    <Container>
        <TextContainer>
            <h1>{activePark.fullName }</h1>
            <h2>{activePark.states}</h2>
        </TextContainer>
      <ImageContainer>
        <img src={activePark.images[0].url} alt={activePark.images[0].altText}></img>
      </ImageContainer>
    </Container>
  )
  } else {
    return null
  }
}

export default ParkLanding

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
  top: 100px;
  z-index: 2;
  color: white;
  background: rgba(43, 43, 43, 60%);
  width: 100%;
  padding-bottom: 5px;
  padding-top: 5px;

  h1 {
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 5px;
  }

  h2 {
    text-align: center;
  }
`