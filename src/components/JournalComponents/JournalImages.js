import styled from 'styled-components'
import {useContext, useState} from 'react'
import ActiveParkContext from "../ActiveParkContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import EditIcon from '@material-ui/icons/Edit';
import  Modal  from './Modal';
import PhotosEdit from './PhotosEdit'


function JournalImages({currentUser, visit, onImageDelete}) {
    const {activePark} = useContext(ActiveParkContext)
    // const hasPersonalImages = false
    const hasPersonalImages = visit?.images && visit?.images?.length > 0
    const [modalOpen,setModalOpen] = useState(false)
    const [formData, setFormData] = useState({
      // journal: journal
    })
  

    function handleModalToggle(){
      setModalOpen( modalOpen => !modalOpen )
      console.log('click')
    }

    const slideImages = visit.images.map( image => {
      return( 
        < SlideImage key={image.signed_id}img src={image.url} alt={activePark?.fullName}/>
      )
    }) 
    console.log('visit', visit)

  function handleChangeFormData(event){
    // setFormData({...formData, journal: event.target.value})
  }

  function handleUpdateSubmit(event){
    // event.preventDefault()

    // const patchConfig = {
    //   method: "PATCH",
    //   headers:{
    //     "Content-type":"application/json"
    //   },
    //   body: JSON.stringify( formData )
    // }

    // console.log('patchConfig', patchConfig)
    // onVisitUpdate
  }

  function removeImageFromVisit(updatedImages){
    const updatedVisit = {...visit, images: updatedImages}
    console.log('updatedVisit', updatedVisit)
  }

    return (
      <>
        <Container >
          <EditContainer onClick={handleModalToggle}>
            <button> 
              Edit 
              <EditIcon/>
            </button>
          </EditContainer>

          { hasPersonalImages ? 
            <Carousel showThumbs={false} infiniteLoop={true}>
              {slideImages}
            </Carousel>
            :
            <>  
              <TextContainer>
                    <h2> No Personal Photos Found </h2>
                    <h3> Use the edit button upload them now!</h3>
                </TextContainer>
              <ImageContainer>
                <img src={activePark?.images[0].url} alt="No Personal Photos"></img>
              </ImageContainer>
            </>
          }
        </Container>
        {modalOpen && (
          <Modal isShown={modalOpen} toggle={handleModalToggle}>
            <PhotosEdit 
              handleUpdateSubmit={handleUpdateSubmit} 
              handleModalToggle={handleModalToggle} 
              visit={visit} 
              onImageDelete={removeImageFromVisit}
            />
          </Modal>
        )}
      </>
    )
}

export default JournalImages


const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`

const SlideImage = styled.img`
    background-color: none;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    background-repeat: no-repeat;
    margin: auto;
`


const ImageContainer = styled.div`
  width: auto;
  img{
    width: 100%;
  } 
`

const TextContainer = styled.main`
  position: absolute;
  top: 80px;
  z-index: 2;
  color: white;
  background: rgba(43, 43, 43, 60%);
  width: 100%;
  padding-bottom: 5px;
  padding-top: 5px;

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

  h3 {
    margin-top: 10px;
    font-size: 1.4rem;
    text-align: center;
    margin-left: 50px;
    margin-right: 50px;
  }
`


const EditContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 2;
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