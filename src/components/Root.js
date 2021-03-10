import React from 'react'
import styled from 'styled-components'
import logo from '../assets/GOG Logo 2.png'
import DoubleArrowSharpIcon from '@material-ui/icons/DoubleArrowSharp';



function Root() {
  return (
    <Container>
      <FormContainer>
        <TextContainer>
          <Header>
              <img src={logo} alt="Great Outdoors Guide Logo"/>
              <h2>WELCOME</h2> 
              <h2>TO THE</h2>
              <h1>Great Outdoors Guide </h1> 
              <hr/>
          </Header>
          <Content>
            <WelcomeMessage>
              <p>Your National Parks Travel Companion</p>
              <p>Browse through all of the US National Parks to begin planning your next adventure</p>
              <p>Creating an account will allow you to record your favorite moments from your adventures</p>
              <ul>
                <ListItem> 
                  <DoubleArrowSharpIcon/>
                    <p>Write in your Travel Journal </p>
                  <DoubleArrowSharpIcon/>
                </ListItem>
                <ListItem> 
                  <DoubleArrowSharpIcon/>
                  <p> Treasure Memories in your Photo Albums </p>
                  <DoubleArrowSharpIcon/>
                </ListItem>
                <ListItem> 
                  <DoubleArrowSharpIcon/>
                    <p> Review the park to help others plan </p>
                  <DoubleArrowSharpIcon/>
                </ListItem>
              </ul>
            </WelcomeMessage> 
          </Content>
        </TextContainer>
      </FormContainer>
      <ImageContainer>
        <img 
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic3.businessinsider.com%2Fimage%2F5535513e6bb3f73c6b8b4567%2F33-stunning-pictures-of-us-national-parks.jpg&f=1&nofb=1"
          alt="National Parks Background"
        />
      
      
      </ImageContainer>
  </Container>
  )
}

export default Root

const Container = styled.div`
  position: relative;
  height: 100%;
  grid-row: 2 / 4;
  display: flex;
  align-items: center;
  object-fit: cover;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 4rem;
    margin: 0;
    padding: 0;
  }

  h2 {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;

    :first-of-type {
      font-size: 2.25rem;
    }

    :last-of-type{
      padding-top: 8px;
    }
  }

  hr{
    width: 50%;
  }
`

const Content = styled.main`

`

const WelcomeMessage = styled.div`
  text-align: center;

  ul {
    padding-inline-start: 0;
  }
`


const TextContainer = styled.main`
  color: white;
  background: rgba(43, 43, 43, 60%);
  width: auto;
  padding-bottom: 5px;
  padding-top: 5px;

  p {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0;
    padding: 4px;
  }

`
  
const ImageContainer = styled.div`
  width: 100%;
  max-height: calc(100vh - 180px);
  overflow:hidden;
  img{
    width: 100%;
  } 
`

const FormContainer = styled.main`
  position: absolute;
  display: flex;
  z-index: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const ListItem = styled.li`
  /* display: block; */
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    padding-bottom: 8px;
  }
  svg{
    
    :last-of-type{
      transform: rotateZ(180deg)
    }
  }
`