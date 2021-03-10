import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

function LoginForm({setCurrentUser, setViewMode}) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
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

  const loadingComponent = loading && (
    <p style={{ color: "var(--teal)" }}>
      Loading...
    </p>
    )

  function handleFormButtonClick(){
      setIsLogin(isLogin => !isLogin)
  }



  function handleLoginSubmit(e) {
    e.preventDefault();
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
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
        setLoading(false)
        setCurrentUser(data.user);
        localStorage.setItem("token", data.token);
        setViewMode("journal")
        history.push("/journal");
      })
      .catch((data) => {
        setLoading(false)
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
    // fetch("http://localhost:3000/signup", {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
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
            {loadingComponent}
              {errors && errors.map((error) => (
          <p key={error} style={{ color: "red" }}>
            {error}
          </p>
        ))}
            <button disabled={loading} type="submit">Submit</button>
            <button type="button" onClick={handleFormButtonClick}> {isLogin ? "Sign Up Today!" : "Login"}</button>
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

  h1 {
    margin-top: 0;
  }
  input {
    border-radius: 6px;
    width: 175px;
    height: 20px;
    margin-bottom: 5px;
    text-align: center;
    padding-bottom: 4px;
    padding-top: 4px;
  }

  button{
    :last-of-type{
      margin-top: 40px;
      padding: 2px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 1.3rem;
    }
  }
`