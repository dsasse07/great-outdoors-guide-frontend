import React from 'react'
import styled from 'styled-components'

function Review({visit}) {
  const {id, score, review, username, created_at} = visit

  const DateString = new Date(created_at).toDateString().slice(4)

  return (
    <Container>
      <Header>
        <Username> {username} </Username>
        { score && 
        <Score> Rating : <span> {score} </span> </Score>
        }
      </Header>
      <DateContainer> {created_at && DateString}  </DateContainer>
      <Content>
        {review}
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
  font-size: 18px;
`

const Score = styled.p`
  margin: 0;
  font-size: 16px;
  padding-right: 20px;
`

const DateContainer = styled.p`
  margin: 0;
  margin-bottom: 10px;
  font-size: 14px;
`

const Content = styled.section`
  font-size: 16px;
  padding-right: 4px;
  padding-left: 4px;
`

