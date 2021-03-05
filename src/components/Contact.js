import React from 'react'
import {useContext} from 'react'
import ActiveParkContext from "./ActiveParkContext"
import styled from 'styled-components'

function Contact() {
  const {activePark} = useContext(ActiveParkContext)
  const randomIndex = Math.floor(Math.random() * activePark?.images.length)
  const emailAddress = activePark?.contacts.emailAddresses[0].emailAddress 
  const phoneNumber = activePark?.contacts.phoneNumbers[0].phoneNumber
  const homePage = activePark?.url
  
  if (activePark ) {
    return (
      <Container>
          <TextContainer>
              <h1>{activePark.fullName }</h1>
              <h2>Contact Information:</h2>
              <List>
                <ListItem>Email : <a href= {"mailto: " + emailAddress}>{emailAddress}</a> </ListItem>
                <ListItem>Phone : {phoneNumber}</ListItem>
                <ListItem> <a href={homePage} target="_blank" rel="noreferrer">Home Page</a> </ListItem>
              </List>
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

export default Contact
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

const List = styled.ul`
  list-style-type: none;
  text-align: center;
  padding-inline-start: 0;
  font-weight: bold;
`

const ListItem = styled.li`
  font-size: 1.5rem;
  margin-bottom: 6px;
  font-weight: bold;
  a {
    color: #6cfcc5;
  }
`