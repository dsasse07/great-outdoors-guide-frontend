import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {useContext} from 'react'
import ActiveParkContext from "./ActiveParkContext";

function ParkList({ nationalParks}) {
  const {zoom, center, handleActiveParkChange, setZoom} = useContext(ActiveParkContext)
  
  const nationalParksList = nationalParks.map((park)=>{
    return(
      <li 
        onClick={()=>handleClick(park)} 
        key={park.id}
      >
        <NavLink to={`/${park.parkCode}`}>{park.fullName}</NavLink>
      </li>
    )
  })
  
  function handleClick(park){
    handleActiveParkChange(park)
  }

  return (  
    <Container>
      <Header>
        U.S. National Parks
      </Header>
        <List> 
          {nationalParksList}
        </List>
    </Container>
  );
}

export default ParkList;

const Container = styled.div`
  height: 100%;
  overflow:hidden;
  display: grid;
  grid-template-rows: auto 1fr;
  padding-right: 10px;
  `
const Header = styled.header`
  font-size: 2rem;
  text-align: center;
  margin-top: 5px;
  padding-bottom: 10px;
  border-bottom: 2px solid gray;
`

const List = styled.ul`
  height: 100%;
  overflow:scroll;
  width: auto;
  padding-right: 20px;
`