import styled from 'styled-components'


function InfoPanel({ activePark }) {
  
  return (
    <Container>
        <h1> {activePark && activePark.fullName}</h1>
    </Container>
  );
}

export default InfoPanel;

const Container = styled.div``