import styled from 'styled-components'
import {useContext} from 'react'
import ActiveParkContext from "../ActiveParkContext";
import EditIcon from '@material-ui/icons/Edit';



function JournalPage({currentUser, visit}) {
  const {activePark} = useContext(ActiveParkContext)
  const {created_at, journal} = visit
  console.log('visit', visit)
  const DateString = new Date(created_at).toDateString().slice(4)
  const featuredImages =  [[...visit.images], [...activePark.images.map(image => image.url)]].flat()
  const randomIndex = Math.floor(Math.random() * featuredImages.length)

  console.log('featuredImages', featuredImages)
  if (activePark ) {
    return (
      <Container>
          <TextContainer>
              <Title>
                {activePark.fullName }
              </Title>
              <SubTitle>
                <h2> {DateString} </h2>
                <EditContainer>
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
          <img src={visit.images[0]} alt={activePark.fullName}></img>
        </ImageContainer>
      </Container>
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
