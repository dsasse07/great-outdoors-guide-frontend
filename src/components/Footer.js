import React from 'react'
import styled from 'styled-components'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn';

function Footer() {
  return (
    <Container>
      <GitHub>
        <LinkBlock href="https://github.com/dsasse07/great-outdoors-guide-frontend" target="_blank" rel="noreferrer">
          <GitHubIcon/>
          <p> Front End </p>
        </LinkBlock>
        <LinkBlock href="https://github.com/dsasse07/great-outdoors-guide-backend" target="_blank" rel="noreferrer">
          <GitHubIcon/>
          <p> Back End </p>
        </LinkBlock>
      </GitHub>
      <AuthorsBlock>
        <p> Created By : </p>
        <a href="https://www.linkedin.com/in/danny-sasse/" target="_blank" rel="noreferrer">
          <LinkedInIcon/>
          Daniel Sasse
        </a>
        <p > and </p>
        <a href="www.linkedin.com/in/john-wisneski/" target="_blank" rel="noreferrer" >
        <LinkedInIcon/>
          John Wisneski
        </a>
        <p>-  2021</p>
      </AuthorsBlock>
    </Container>
  )
}

export default Footer

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const GitHub = styled.div`
  display: flex;
  align-items: center;
`

const LinkBlock = styled.a`
  display: flex;
  align-items: center;
  color: var(--md-green);
  padding-right: 30px;
  padding-left: 30px;
  border-right: 2px solid var(--md-green);
  text-decoration: none;

  p {
    margin-left: 10px;
  }

  :hover {
    background: var(--yellow);
    color: var(--md-green);
  }
`

const AuthorsBlock = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 75px;
  a {
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    height: 100%;
    color: var(--md-green);
    align-items:center;
    margin-right: 8px;
    margin-left: 8px;
    text-decoration: none;
  }

`