import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import ActiveParkContext from "./ActiveParkContext";
import {useContext} from 'react'
import logo from '../assets/GOG Logo 2.png'

function Header({onViewModeChange,currentUser, setCurrentUser}) {
  const {activePark, resetOnLogout} = useContext(ActiveParkContext)
  const history = useHistory()

  function handleClick(event){
    onViewModeChange(event.target.value)
    history.push(`/${event.target.value}${activePark ? "/"+activePark.parkCode : "" }`)
  }

  function logout() {
    localStorage.removeItem("token");
    resetOnLogout()
    setCurrentUser(false);
    history.push("/login")
  }

  function goToLogin(){
    history.push("/login")
  }

  return (
    <Container>
      <LogoContainer>
        <Logo>
          <img src={logo} alt="GOG Logo"/>
        </Logo>
      </LogoContainer>
      <Title>
        <h1>Great Outdoors Guide</h1>
      </Title>
      <NavContainer>
        <button value="parks" onClick={handleClick}>Park Info</button>
        { currentUser && 
        <button value="journal" onClick={handleClick}>Travel Journal</button>
        }
        <button onClick={currentUser ? logout : goToLogin}>
          {currentUser ? "Logout" : "Login" }
        </button>

      </NavContainer>
    </Container>
  )
}

export default Header

const Container = styled.header`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: var(--white);
  color: var(--md-green);  
  padding-left: 80px;
  padding-right: 80px;
  
`
const Title = styled.div`
  h1{
    font-size: 3.5rem;
    text-shadow: 2px 2px 4px var(--lt-orange);
  }
`

const LogoContainer = styled.div`
  display: flex;
  margin-left: 145px;
  padding-right: 30px;
  padding-left: 30px;
  align-items: center;
`
const Logo = styled.div`
  height: 100%;
  margin-right: 50px;
  display: flex;
  align-items: center;

  img {
    max-width: 100px;
  }
`

const NavContainer = styled.nav`
  height: 100px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 75px;
  display: flex;
  align-items: center;
  
  button {
    border: 1px solid var(--yellow);
    text-align: center;
    padding-top: 8px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 8px;
    font-size: 18px;
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    margin-left: 20px;
    outline: none;
    :hover{
      background: var(--yellow);
      color: var(--md-green);
      border: 1px solid var(--md-green);
    } 

  }
`

