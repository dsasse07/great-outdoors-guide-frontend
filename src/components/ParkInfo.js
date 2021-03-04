import styled from 'styled-components'


function ParkInfo({ activePark }) {
  
  return (
    <Container>
        <h1>{ activePark && activePark.description} Links Here</h1>
    </Container>
  );
}

export default ParkInfo;

const Container = styled.div``