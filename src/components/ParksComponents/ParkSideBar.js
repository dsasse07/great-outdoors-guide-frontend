import styled from 'styled-components'
import {NavLink, useRouteMatch} from "react-router-dom";
import {useContext} from 'react'
import ActiveParkContext from "../ActiveParkContext";


function ParkSideBar() {
  const match = useRouteMatch()
  const {activePark} = useContext(ActiveParkContext)

  return (
    <Container>
        <h1> {activePark && activePark.name}</h1>
        <LinkButton type="button" exact to={`${match.url}`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          Main
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/description`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          Description
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/images`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          Images
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/directions`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          Directions
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/weather`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          Weather
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/contact`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          Contact
        </LinkButton>
    </Container>
  );
}

export default ParkSideBar;

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
  margin-left: 20px;
  
  h1{
    font-size: 2rem;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 15px;
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