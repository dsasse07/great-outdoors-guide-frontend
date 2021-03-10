import styled from 'styled-components'
import {NavLink, useRouteMatch, useHistory} from "react-router-dom";
import {useContext} from 'react'
import ActiveParkContext from "../ActiveParkContext";


function JournalSideBar({currentUser, visit, handleDeleteVisit}) {
  const match = useRouteMatch()
  const {activePark} = useContext(ActiveParkContext)
  const history = useHistory();


  function handleDelete(e){
    const {id} = visit
    if (window.confirm('Are you sure you wish to delete this visit?')){ 
      fetch(`${process.env.REACT_APP_BACKEND_URL}/visits/${id}`, {
        method: "DELETE"
    })
    handleDeleteVisit(id)
  history.push(`${match.url}`)
  }
  }

  return (
    <Container>
        <h1> {currentUser && `${currentUser.first_name}'s Travel Journal`}</h1>
        <h2> {activePark?.fullName} </h2>

        {visit ? 
        <>
          <LinkButton type="button" exact to={`${match.url}`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
            Journal Entry
          </LinkButton>
          <LinkButton type="button" to={`${match.url}/images`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
            Photos
          </LinkButton>
          <LinkButton type="button" to={`${match.url}/review`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
            Your Review
          </LinkButton>
          
          <DeleteButton type="button" onClick={handleDelete}>
            Delete my Visit
          </DeleteButton>
        </>
        : 
      null 
      }
    </Container>
  );
}

export default JournalSideBar;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 7px 3px var(--lt-orange);
  color: var(--md-green);  
  margin-left: 20px;
  
  h1{
    font-size: 2rem;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px var(--lt-orange);

  }

  h2 {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px var(--lt-orange);

  }
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
const DeleteButton = styled.button`
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
  width: 100%;
  :hover{
    background: var(--yellow);
    color: var(--md-green);
  }
`