import styled from 'styled-components'
import {NavLink, useRouteMatch} from "react-router-dom";
import {useContext, useState} from 'react'
import ActiveParkContext from "../ActiveParkContext";


function JournalSideBar({currentUser, hasVisited}) {
  const match = useRouteMatch()
  const {activePark} = useContext(ActiveParkContext)

  return (
    <Container>
        <h1> {currentUser && `${currentUser.first_name}'s Travel Journal`}</h1>
        <h2> {activePark?.fullName} </h2>

        {hasVisited ? 
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
  box-shadow: 0 0 7px 3px var(--yellow);
  color: var(--md-green);  

  h1{
    font-size: 2rem;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 1.5rem;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 15px;
  }
`

const LinkButton = styled(NavLink)`
  display: block;
  border: 1px solid cyan;
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