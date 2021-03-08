import React from 'react'
import styled from 'styled-components'

function Review({review}) {
  const {id, score, content, username, created_at} = review

  const DateString = new Date(created_at).toDateString().slice(4)

  return (
    <Container>
      <Header>
        <Username> {username} </Username>
        <Score> Rating : <span> {score} </span> </Score>
      </Header>
      <DateContainer> {DateString}  </DateContainer>
      <Content>
        {content}
      </Content>

    </Container>
  )
}

export default Review

const Container = styled.div`
  width: 400px;
  border-bottom: 1px solid var(--md-green);
  padding-bottom: 6px;
  padding-top: 6px;
  padding-left: 5px;
  padding-right: 5px;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Username = styled.h4`
  margin: 0;
  font-size: 16px;
`

const Score = styled.p`
  margin: 0;
  font-size: 16px;
  padding-right: 20px;
`

const DateContainer = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-size: 16px;
`

const Content = styled.section`
  font-size: 16px;
  padding-right: 4px;
  padding-left: 4px;
`

