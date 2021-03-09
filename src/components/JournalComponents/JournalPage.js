import styled from 'styled-components'
import {useContext, useState, useEffect} from 'react'
import ActiveParkContext from "../ActiveParkContext";
import EditIcon from '@material-ui/icons/Edit';
import  Modal  from './Modal';
import {useHistory, useRouteMatch} from 'react-router-dom'


function JournalPage({currentUser, visit, onVisitUpdate}) {
  const {activePark} = useContext(ActiveParkContext)
  const history = useHistory()
  const match = useRouteMatch()
  const {created_at, journal, id} = visit
  const [modalOpen,setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    journal: journal
  })
  const DateString = new Date(created_at).toDateString().slice(4)
  const featuredImages = (visit.images && visit.images.length > 0) ? visit.images : activePark?.images

  function randomItemFromArray(array){
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  function handleModalToggle(){
    setFormData( {journal: journal} )
    setModalOpen( modalOpen => !modalOpen )
  }

  function handleChangeFormData(event){
    setFormData({...formData, journal: event.target.value})
  }

  function handleUpdateSubmit(event){
    event.preventDefault()

    fetch(`${process.env.REACT_APP_BACKEND_URL}/visits/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify( formData )
    })
    .then(response => response.json())
    .then(updatedVisit => {
        onVisitUpdate(updatedVisit)
    })

    handleModalToggle()
    history.push(`${match.url}`)
  }
  
  console.log('visit', visit)
  
  if (activePark ) {
    return (
      <>
        <Container>
            <TextContainer>
                <Title>
                  {activePark.fullName }
                </Title>
                <SubTitle>
                  <h2> {DateString} </h2>
                  <EditContainer onClick={handleModalToggle}>
                    <button> 
                      Edit 
                      <EditIcon/>
                    </button>
                  </EditContainer>
                </SubTitle>
                <Journal>
                  {journal}
                </Journal> 
            </TextContainer>
          <ImageContainer>
            <img src={randomItemFromArray(featuredImages).url} alt={activePark?.fullName}></img>
          </ImageContainer>
        </Container>
        {modalOpen && (
          <Modal isShown={modalOpen} toggle={handleModalToggle}>
            <h1>Edit Your Journal</h1>

            <form onSubmit={handleUpdateSubmit}>
              <textarea
                type="text"
                name="journal"
                value={formData.journal}
                onChange={handleChangeFormData}
              />
              <input type="submit" value="Update Journal Entry" />
            </form>
            <button onClick={handleModalToggle}>Cancel</button>
          </Modal>
        )}
      </>
    )
    } else {
      return null
    }
}

export default JournalPage;

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
`

const Title = styled.h1`
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 0;
`

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 75px;
  padding-right: 75px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    text-align: center;
  }
`

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--md-green);
  padding: 4px;
  border-radius: 8px;

  button {
    display: flex;
    align-items: center;
    background: transparent;
    border: 1px solid var(--yellow);
    text-align: center;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 8px;
    color: var(--yellow);
    font-size: 1.25rem;
  }
  :hover{
    background: var(--yellow);
    button{
      color: var(--md-green);
      border: 1px solid var(--md-green);
    }
  }
  svg{
    font-size: 1.5rem;
  }
`

const Journal = styled.h3`
  margin-top: 10px;
  font-size: 1.4rem;
  text-align: center;
  margin-left: 50px;
  margin-right: 50px;
`
