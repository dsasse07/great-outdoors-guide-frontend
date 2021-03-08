import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import {useContext, useState} from 'react'
import ActiveParkContext from "./ActiveParkContext";
import SearchIcon from '@material-ui/icons/Search';

function ParkList({viewMode}) {
  const {handleActiveParkChange, nationalParks} = useContext(ActiveParkContext)
  const [search, SetSearch] = useState("")
  const filteredParks = nationalParks.filter( park => {
    return (
      park.fullName.toLowerCase().includes( search.toLowerCase() ) ||
      park.states.toLowerCase().includes( search.toLowerCase() )
    )
  })

  const nationalParksList = filteredParks.map((park)=>{
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

  function handleSearchChange(event){
    SetSearch(event.target.value)
  }

  return (  
    <Container>
      <Header>
        U.S. National Parks
        <SearchArea>
          <input type="text" value={search} placeholder="Search..." onChange={handleSearchChange}/>
          <SearchIcon />
        </SearchArea>
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
  width: 370px;
  margin-left: 20px;
`
const Header = styled.header`
  font-size: 2rem;
  margin-top: 5px;
  padding-bottom: 10px;
  border-bottom: 2px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SearchArea = styled.div`
  display: flex;
  align-items: center;

  input {
    outline: none;
    border-radius: 6px;
    border: 1px solid var(--md-green);
    margin-top: 5px;
    font-size: 16px;
    text-align: center;
  }

  svg {
    padding-top: 6px;
  }
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
  text-decoration: none;

  :hover{
    background: var(--yellow);
    color: var(--md-green);
  }
`