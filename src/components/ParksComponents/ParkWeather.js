import React from 'react'
import {useContext} from 'react'
import ActiveParkContext from "../ActiveParkContext";
import styled from 'styled-components'

function ParkWeather() {
  const {activePark} = useContext(ActiveParkContext)
  const randomIndex = Math.floor(Math.random() * activePark?.images.length)

  const weatherNotices = activePark?.weatherInfo.split(".")
    .filter( notice => {
      return !!notice
    })
    .map(notice => {
      return <Notice key={notice}>{notice}</Notice>
    })



  if (activePark ) {
    return (
      <Container>
          <TextContainer>
              <h1>{activePark.fullName }</h1>
              <h2>Weather Information</h2>
              <NoticesList>
                {weatherNotices}
              </NoticesList>
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

export default ParkWeather


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

const NoticesList = styled.ul`
  list-style-type: none;
  text-align: center;
  padding-inline-start: 0;
`

const Notice = styled.li`
  font-size: 1.4rem;
  margin-bottom: 6px;
`