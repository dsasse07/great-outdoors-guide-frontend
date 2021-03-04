import styled from 'styled-components'
import SideBar from './SideBar'
import ParkInfo from './ParkInfo'

function InfoPanel({ activePark }) {
  
  return (
    <Container>
      <SideBarContainer>
        <SideBar activePark={activePark}/>
      </SideBarContainer>
      <ParkContainer>
        <ParkInfo activePark={activePark} />
      </ParkContainer>
    </Container>
  );
}

export default InfoPanel;

const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-gap: 30px;
  height: 100%;
`

const SideBarContainer = styled.aside`
  grid-column: 1;
  background: gray;
`

const ParkContainer = styled.main`
  grid-column: 2;
  background: gray;
`



