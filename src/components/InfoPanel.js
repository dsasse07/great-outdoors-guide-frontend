import styled from 'styled-components'
import SideBar from './SideBar'
import ParkInfo from './ParkInfo'
import { Switch, Route} from 'react-router-dom'


function InfoPanel({ activePark }) {
  
  return (
    <Container>
      <SideBarContainer>
        <SideBar activePark={activePark}/>
      </SideBarContainer>
      {/* <Switch>
        <Route path='/parks/:parkCode/:component'>
          <ParkContainer>
            <ParkInfo activePark={activePark} />
          </ParkContainer>
        </Route>
      </Switch> */}
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



