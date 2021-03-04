import styled from 'styled-components'
import {NavLink, useHistory, useParams} from "react-router-dom";

function InfoPanel({ activePark }) {

  return (
    <Container>
        <h1> {activePark && activePark.fullName}</h1>
        <NavLink type="button" to={`/${activePark?.parkCode}/description`}>Description</NavLink>
    </Container>
  );
}

export default InfoPanel;

const Container = styled.div``