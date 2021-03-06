import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

function LoginForm({setCurrentUser, setViewMode}) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({
        ...formData,
        [name]: value,
    });
  }

  function handleFormButtonClick(){
      setIsLogin(isLogin => !isLogin)
  }



  function handleLoginSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      .then((data) => {
        setCurrentUser(data.user);
        localStorage.setItem("token", data.token);
        setViewMode("journal")
        history.push("/journal");
      })
      .catch((data) => {
        setErrors(data.errors);
      });
  }
  
  function handleSignupSubmit(e) {
    const newSignup = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      password: formData.password,
    }

    e.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSignup),
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
      .then((data) => {
        setCurrentUser(data.user);
        localStorage.setItem("token", data.token);
        setViewMode("journal")
        history.push("/journal");
      })
      .catch((data) => {
        setErrors(data.errors);
      });
  }
    return ( 
        <Form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit} autoComplete="off">
            <button type="button" onClick={handleFormButtonClick}> {isLogin ? "Signup Form" : "Login Form"}</button>
            <h1>{isLogin? "Login" : "Signup"}</h1>
            {!isLogin? 
            <>
              <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              placeholder="Last Name"
              required
            /> </>: <></> }
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              checked={formData.password}
              placeholder="Password"
              required
            />
              {errors && errors.map((error) => (
          <p key={error} style={{ color: "red" }}>
            {error}
          </p>
        ))}
            <button type="submit">Submit</button>
      </Form>
    )
}

export default LoginForm

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(43, 43, 43, 60%);
  color: white;
  padding: 70px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%), 0 1px 2px rgb(0 0 0 / 50%);


  input {
    border-radius: 6px;
    width: 175px;
    height: 20px;
    margin-bottom: 5px;
    text-align: center;
  }
`