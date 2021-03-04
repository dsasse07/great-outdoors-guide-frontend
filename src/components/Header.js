import styled from 'styled-components'


function Header() {
  return (
    <Container>
      <LogoContainer>
        <h1>Logo Goes Here</h1>
      </LogoContainer>
      <NavContainer>
        <button>Nav Button</button>
        <button>Nav Button</button>
        <button>Nav Button</button>
        <button>Nav Button</button>
      </NavContainer>
    </Container>
  )
}

export default Header

const Container = styled.header`
  height: 100%;
  background: gray;
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