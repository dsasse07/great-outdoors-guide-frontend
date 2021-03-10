import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import NewVisitForm from './NewVisitForm'
import ActiveParkContext from "../ActiveParkContext"


function JournalMain({setVisit,visit, onVisit, currentUser, setCurrentUser}) {
  const {activePark} = useContext(ActiveParkContext)
  const [openVisitForm, setOpenVisitForm] = useState(false)

  function handleOpenForm(){
    setOpenVisitForm(openVisitForm => !openVisitForm)
  }



  return (
    <Container>
      <TextContainer>
        <Header>
          <h1>{visit ? `Adventures in ${activePark?.fullName}` : "You haven't logged a visit yet!" } </h1> 
          {!visit && 
            <button onClick={handleOpenForm}> 
              { openVisitForm ? "Close" : "Log Your Visit!" } 
            </button>
          }
        </Header>
        <Content>
          { (!visit && openVisitForm) && <NewVisitForm setVisit={setVisit} currentUser={currentUser} setCurrentUser={setCurrentUser}/> }
          { (!visit && !openVisitForm) && 
          <WelcomeMessage>
            <h2>Create a Journal Entry </h2>
            <h2>To document your trip to {activePark?.fullName}</h2> 
            <h2> For each park that you visit, you will earn the badge for that park.</h2>
          </WelcomeMessage> 
          }
        </Content>
      </TextContainer>
      <ImageContainer>
        <img src={activePark?.images[0].url} alt={activePark?.images[0].altText}></img>
      </ImageContainer>
    </Container>
  )
}

export default JournalMain

const Container = styled.div`
  position: relative;
  width: 100%;
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


const ImageContainer = styled.div`
  img{
    width: 100%;
  } 
`

const TextContainer = styled.main`
  position: absolute;
  /* top: 100px; */
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