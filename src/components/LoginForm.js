import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm() {
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  function handleSubmit(e) {
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
        // setCurrentUser(data.user);
        localStorage.setItem("token", data.token);
        history.push("/");
      })
      .catch((data) => {
        setErrors(data.errors);
      });
  }
    return (
        <form onSubmit={handleSubmit}>
              <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
            <input
              type="text"
              name="password"
              onChange={handleChange}
              checked={formData.password}
            />
             {errors.map((error) => (
          <p key={error} style={{ color: "red" }}>
            {error}
          </p>
        ))}
            <button type="submit">Submit</button>
      </form>
    )
}

export default LoginForm
