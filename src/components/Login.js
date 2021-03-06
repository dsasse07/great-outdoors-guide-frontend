import React from 'react'
import styled from 'styled-components'
import LoginForm from './LoginForm'
// import SignUpForm from './SignUpForm'

function Login({setCurrentUser, setViewMode}) {
  return (
    <Container>
      <FormContainer>
        <LoginForm setViewMode={setViewMode} setCurrentUser={setCurrentUser}/>
        {/* <SignUpForm/> */}
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

export default Login

const Container = styled.div`
  position: relative;
  height: 100%;
  grid-row: 2 / 4;
  display: flex;
  align-items: center;
  object-fit: cover;

`

const ImageContainer = styled.div`

  width: 100%;
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