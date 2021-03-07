import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {useContext} from 'react'
import ActiveParkContext from "./ActiveParkContext";

function ParkList({viewMode}) {
  const {handleActiveParkChange, nationalParks} = useContext(ActiveParkContext)

  const nationalParksList = nationalParks.map((park)=>{
    return(
      <li onClick={()=>handleClick(park)} key={park.id} >
        <LinkButton to={`/${viewMode}/${park.parkCode}`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          {park.fullName}
        </LinkButton>
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
  border: 1px solid;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 7px 3px var(--yellow);
  color: var(--md-green);
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
  padding-right: 10px;
  list-style-type: none;
  padding-inline-start: 10px;
`

const LinkButton = styled(NavLink)`
  display: block;
  border: 1px solid var(--md-green);
  margin-bottom: 8px;
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 18px;
  border-radius: 8px;
  background: var(--md-green);
  color: var(--yellow);
  
  :hover{
    background: var(--yellow);
    color: var(--md-green);
  }
`