import styled from 'styled-components'
import {useContext} from 'react'
import ActiveParkContext from "./ActiveParkContext";




function ParkDescription({ }) {
  const {activePark} = useContext(ActiveParkContext)

  return (
    <Container>
      <h1>{ activePark && activePark.description}</h1>
    </Container>
  );
}

export default ParkDescription;

const Container = styled.div``