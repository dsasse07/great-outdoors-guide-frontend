import styled from 'styled-components'
import {NavLink, useRouteMatch} from "react-router-dom";

function SideBar({ activePark }) {

  const match = useRouteMatch()

  return (
    <Container>
        <h1> {activePark && activePark.name}</h1>
        <NavLink type="button" to={`${match.url}/description`}>Description</NavLink>
        <h1>Landing: FullName, State</h1>
        <h1>Images</h1>
        <h1>Contact: Url, Phone NUmbers, Address, Hours</h1>
        <h1>Directions Info + Url</h1>
        <h1>Weather Info</h1>
    </Container>
  );
}

export default SideBar;

const Container = styled.div``