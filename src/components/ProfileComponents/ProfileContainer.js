import React from 'react'
import styled from 'styled-components'
import ProfileBadges from './ProfileBadges'
import ProfileVisits from './ProfileVisits'
import {NavLink, useRouteMatch, Switch, Route} from "react-router-dom";

function ProfileContainer({currentUser}) {
  const match = useRouteMatch()
  return (
    <Container>
      <ProfileSideBar>
        <h1> Profile </h1>
        <LinkButton type="button" exact to={`${match.url}`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          Badges
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/visits`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          Your Visits
        </LinkButton>
        <LinkButton type="button" to={`${match.url}/settings`} activeStyle={{background: "var(--yellow)", color: "var(--md-green)"}}>
          Account Settings
        </LinkButton>
      </ProfileSideBar>
      
      <Switch>
        <ProfilePanel>
          <Route exact path={`${match.url}`} >
            <ProfileBadges currentUser={currentUser}/>
          </Route>
          <Route exact path={`${match.url}/visits`} >
            <ProfileVisits currentUser={currentUser} />
          </Route>
          <Route exact path={`${match.url}/settings`} >
            Settings!
          </Route>
        </ProfilePanel>
      </Switch>

    </Container>
  )
}

export default ProfileContainer

const Container = styled.div`
  grid-row: 2 / 4;
  height: 100%;
  min-height: calc(100vh - 220px);
  display: flex;
  gap: 40px;
`

const ProfileSideBar = styled.aside`
  max-width: 25%;
  min-width: 250px;
  height: fit-content;

  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 7px 3px #f2af58;
  color: var(--md-green);  
  margin-left: 20px;

  h1{
    font-size: 2rem;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 15px;
    text-shadow: 2px 2px 8px var(--lt-orange);

  }
`

const ProfilePanel = styled.main`
  width: 100%;
  min-width: 250px;
  height: fit-content;

  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 0 7px 3px #f2af58;
  color: var(--md-green);  
  margin-left: 20px;
  margin-right: 20px;
`

const LinkButton = styled(NavLink)`
  display: block;
  border: 1px solid var(--md-green);
  margin-bottom: 8px;
  text-align: center;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 18px;
  border-radius: 8px;
  background: var(--md-green);
  color: var(--yellow);
  text-decoration: none;


  :hover{
    background: var(--yellow);
    color: var(--md-green);
  }
`