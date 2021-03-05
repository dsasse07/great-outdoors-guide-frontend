import styled from 'styled-components'
import {NavLink, useRouteMatch} from "react-router-dom";
import {useContext} from 'react'
import ActiveParkContext from "./ActiveParkContext";


function SideBar() {
  const match = useRouteMatch()
  const {activePark} = useContext(ActiveParkContext)

  return (
    <Container>
        <h1> {activePark && activePark.name}</h1>
        <LinkButton type="button" exact to={`${match.url}`} activeStyle={{background: "white"}}>
          Main
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/description`} activeStyle={{background: "white"}}>
          Description
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/images`} activeStyle={{background: "white"}}>
          Images
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/contact`} activeStyle={{background: "white"}}>
          Contact
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/weather`} activeStyle={{background: "white"}}>
          Weather
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/directions`} activeStyle={{background: "white"}}>
          Directions
        </LinkButton>
        <h1>Images</h1>
        <h1>Contact: Url, Phone NUmbers, Address, Hours</h1>
        <h1>Directions Info + Url</h1>
        <h1>Weather Info</h1>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: gray;
  
`

const LinkButton = styled(NavLink)`
  display: block;
  border: 1px solid cyan;
  margin-bottom: 8px;
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 18px;
`