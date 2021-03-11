import React from 'react'
import {useContext} from 'react'
import ActiveParkContext from "../ActiveParkContext";
import styled from 'styled-components'

function ParkDirections() {
  const {activePark} = useContext(ActiveParkContext)
  const randomIndex = Math.floor(Math.random() * activePark?.images.length)


  if (activePark ) {
    return (
      <Container>
          <TextContainer>
              <h1>{activePark.fullName }</h1>
              <h2>Directions Information</h2>
              <DirectionsText>
                {activePark.directionsInfo}
              </DirectionsText>
              <DirectionsLink target="_blank" href={activePark.directionsUrl}>
                Further Directions & Alerts
              </DirectionsLink>
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

export default ParkDirections


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
  text-align: center;
  font-weight: bold;
 
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
`

const DirectionsText = styled.h3`
  margin-top: 10px;
  font-size: 1.4rem;
  text-align: center;
  margin-left: 50px;
  margin-right: 50px;
`
const DirectionsLink = styled.a`
  color: #6cfcc5;
  text-align: center;
  font-weight: bold;
`

