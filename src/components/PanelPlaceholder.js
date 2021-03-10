import React from 'react'
import styled from 'styled-components'

function PanelPlaceholder({text, children}) {
  return (
    <Container>
      <TextContainer>
        <Header>
            <h1>{text} </h1> 
        </Header>
        <Content>
          <WelcomeMessage>
            {children}
          </WelcomeMessage> 
        </Content>
      </TextContainer>
        <ImageContainer>
          <img 
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic3.businessinsider.com%2Fimage%2F5535513e6bb3f73c6b8b4567%2F33-stunning-pictures-of-us-national-parks.jpg&f=1&nofb=1"
            alt="National Parks Background"
          />        
        </ImageContainer>    
      </Container>
  )
}

export default PanelPlaceholder

const Container = styled.div`
  height: 100%;
  min-height: 300px;
  position: relative;
  width: 100%;
  /* max-height: 600px; */
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Content = styled.main`

`

const WelcomeMessage = styled.div`
  text-align: center;
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
    font-size: 2rem;
    margin-bottom: 5px;
    padding-bottom: 10px
  }

  h2 {
    text-align: center;
  }

  button{
    font-size: 18px;
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    border: 1px solid var(--yellow);
  
    :hover{
      background: var(--yellow);
      color: var(--md-green);
      border: 1px solid var(--md-green);
    }
  }
`

const ImageContainer = styled.div`
  max-height: 700px;
  overflow: hidden;
  img{
    width: 100%;
  } 
`