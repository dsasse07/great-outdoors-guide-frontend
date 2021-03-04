import styled from 'styled-components'



function ParkDescription({ activePark }) {

  return (
    <Container>
      <h1>{ activePark && activePark.description}</h1>
    </Container>
  );
}

export default ParkDescription;

const Container = styled.div``