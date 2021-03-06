import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import ActiveParkContext from "./ActiveParkContext";
import {useContext} from 'react'

function Header({onViewModeChange,currentUser, setCurrentUser}) {
  const {activePark} = useContext(ActiveParkContext)
  const history = useHistory()

  function handleClick(event){
    onViewModeChange(event.target.value)
    history.push(`/${event.target.value}${activePark ? "/"+activePark.parkCode : "" }`)
  }

  function logout() {
    localStorage.removeItem("token");
    setCurrentUser(false);
    history.push("login")
  }

  return (
    <Container>
      <LogoContainer>
        <h1>Logo Goes Here</h1>
      </LogoContainer>
      <NavContainer>
        <button value="parks" onClick={handleClick}>Parks Mode</button>
        <button value="journal" onClick={handleClick}>Journal Mode</button>
        <button>Nav Button</button>
        <button onClick={logout}>Logout</button>
      </NavContainer>
    </Container>
  )
}

export default Header

const Container = styled.header`
  height: 100%;
  background: var(--md-green);
  display: flex;
  justify-content: space-between;
`

const LogoContainer = styled.div`
  background: mistyrose;
  margin-left: 10px;
  padding-right: 30px;
  padding-left: 30px;
`

const NavContainer = styled.nav`
  background: mistyrose;
  height: 100px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  
  button {
    width: auto;
    height: 20px;
  }
`