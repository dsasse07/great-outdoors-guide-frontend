import React from 'react'
import styled from 'styled-components'
import LoginForm from './LoginForm'

function Login(setCurrentUser) {
  return (
    <Container>
      <TextContainer>
          {/* <h1>{activePark.fullName }</h1>
          <h2>{activePark.states}</h2> */}
      </TextContainer>
      <ImageContainer>
        {/* <img src="https://images.unsplash.com/photo-1613759731819-082c223e3afa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3450&q=80"></img> */}
        <img src="https://i.redd.it/cllkulf3c6511.jpg"></img>
        {/* <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic3.businessinsider.com%2Fimage%2F5535513e6bb3f73c6b8b4567%2F33-stunning-pictures-of-us-national-parks.jpg&f=1&nofb=1"></img> */}
      </ImageContainer>
  </Container>
  )
}

export default Login

const Container = styled.div`
  background: gray;
  height: 100%;
  grid-row: 2 / 4;
  object-fit: contain;
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