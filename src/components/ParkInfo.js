import { useRouteMatch, Route, useParams } from "react-router-dom";
import styled from 'styled-components'



function ParkInfo({ activePark }) {
  const params= useParams();
  const match = useRouteMatch()
  console.log(params)
  return (
    <Container>
        <Route path={`${match.url}/description`}>
          <h1>{ activePark && activePark.description} Links Here</h1>
        </Route>
    </Container>
  );
}

export default ParkInfo;

const Container = styled.div``