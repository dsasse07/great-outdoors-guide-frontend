import styled from 'styled-components'
import {NavLink, useRouteMatch} from "react-router-dom";

function SideBar({ activePark }) {

  const match = useRouteMatch()

  return (
    <Container>
        <h1> {activePark && activePark.fullName}</h1>
        <NavLink type="button" to={`${match.url}/description`}>Description</NavLink>
    </Container>
  );
}

export default SideBar;

const Container = styled.div``