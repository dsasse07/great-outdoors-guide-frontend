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
  max-height: calc(100vh - 230px);
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
  font-size: 1.5rem;

  input {
    font-size: 1.3rem;
    margin-top: 5px;
  }

  button {
    font-size: 1.5rem;
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    border: 1px solid var(--yellow);
    outline: none;
    margin-bottom: 10px;
    padding-left: 7px;
    padding-right: 7px;

    :hover{
      background: var(--yellow);
      color: var(--md-green);
    }

  }
  button[type="submit"] {
    margin-top: 15px;
  }
`