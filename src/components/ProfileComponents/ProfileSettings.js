import React, {useState} from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

function ProfileBadges({currentUser, onUserUpdate}) {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: currentUser.first_name,
    lastName: currentUser.last_name,
    newPassword: "",
    currentPassword: "",
  });
  const [errors, setErrors] = useState([]);

  const errorComponents = errors && ( errors.map((error) => {
        return (
          <p key={error} style={{ color: "red" }}>
            {error}
          </p>
        )}
    ))
  
  const loadingComponent = loading && (  
    <p style={{ color: "var(--teal)" }}>
      Loading...
  </p>
  )

  function handleFormChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({
        ...formData,
        [name]: value,
    });
  }

  function handleFormSubmit(event){
    event.preventDefault();
    setLoading(true)
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw data;
          });
        }
      })
      .then( updatedUser => {
        setLoading(false)
        onUserUpdate(updatedUser);
        history.push("/profile");
      })
      .catch((data) => {
        setLoading(false)
        setErrors(data.errors);
      });
  }
  

  return (

      <SettingsWrapper>
        <BackgroundContainer>
          <BackgroundImage 
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic3.businessinsider.com%2Fimage%2F5535513e6bb3f73c6b8b4567%2F33-stunning-pictures-of-us-national-parks.jpg&f=1&nofb=1"
          />
        </BackgroundContainer>
        <TextShell>
          <TextContainer>

            <Header>
              <h1>Account Settings </h1>
            </Header>
            
            <Form onSubmit={handleFormSubmit} autoComplete="off">
              <label htmlFor="firstName"> First Name </label>
              <input id="firstName" type="text" name="firstName" onChange={handleFormChange} value={formData.firstName} placeholder="First Name" required />
              
              <label htmlFor="lastName"> Last Name </label>
                <input id="lastName" type="text" name="lastName" onChange={handleFormChange} value={formData.lastName} placeholder="Last Name" required />
              
              <label htmlFor="current_password"> Current Password </label>
              <input id="current_password" type="password" name="current_password" onChange={handleFormChange} checked={formData.currentPassword} placeholder="Current Password" required />

              <label htmlFor="new_password"> New Password </label>
              <input id="new_password" type="password" name="new_password" onChange={handleFormChange} checked={formData.newPassword} placeholder="New Password" />
            {loadingComponent}
            {errorComponents}
            <button type="submit" disabled={loading}> Submit </button>
          </Form>

          </TextContainer>
        </TextShell>
      </SettingsWrapper>


  )
}

export default ProfileBadges

const Header = styled.header` 
  color: var(--white);
`

const SettingsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100vh - 260px);
  overflow: hidden;

`

const BackgroundContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100;
`
const BackgroundImage = styled.img`
  max-width: 100%;
`

const TextShell = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 15px;
`

const TextContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background: rgba(43, 43, 43, 70%);
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 20px;

`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 70px;
  padding-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;

  input {
    border-radius: 6px;
    width: 175px;
    height: 20px;
    margin-bottom: 5px;
    text-align: center;
    padding-bottom: 4px;
    padding-top: 4px;
    font-size: 1.1rem;
  }

  button{
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    border: 1px solid var(--yellow);
    outline: none;
    cursor: pointer;
    margin-top: 40px;
    padding: 2px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1.3rem;

    :hover {
      background: var(--yellow);
      color: var(--md-green);
    }
  }
`