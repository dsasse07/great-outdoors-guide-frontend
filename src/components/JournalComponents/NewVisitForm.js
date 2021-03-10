import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { useHistory, useRouteMatch } from "react-router-dom";
import ActiveParkContext from "../ActiveParkContext";

function NewVisitForm({currentUser, setVisit, setCurrentUser}) {
  const history = useHistory();
  const match = useRouteMatch();
  const [loading, setLoading] = useState(false);
  const {activePark} = useContext(ActiveParkContext)
  const [formData, setFormData] = useState({
    journal: "",
    review: "",
    score: 3,
    code: activePark.parkCode,
    images: [],
    user_id: currentUser.id,
  });
  const [errors, setErrors] = useState([]);
  const loadingComponent = loading && (
    <p style={{ color: "var(--teal)" }}>
    Loading...
    </p>
    ) 

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({
        ...formData,
        [name]: value,
    });
  }

  function handleImageChange(event){
    const name = event.target.name;
    const value = event.target.files;

    setFormData({
        ...formData,
        [name]: value,
    });
  }


  function handleVisitSubmit(e) {
    e.preventDefault();
    setLoading(true)
    const token = localStorage.getItem("token");
    const visitFormData = new FormData();
    visitFormData.append('journal', formData.journal);
    visitFormData.append('review', formData.review);
    visitFormData.append('score', formData.score);
    visitFormData.append('code', formData.code);
    visitFormData.append('user_id', formData.user_id);
    
    for (var i=0; i < formData.images.length; i++) {
      visitFormData.append('images[]', formData.images[i])
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/visits`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
    },
      body: visitFormData,
    })
    .then(r => r.json() )
    .then(newVisit => {
      setLoading(false)
      setCurrentUser(currentUser => {
        return {...currentUser, visits: [...currentUser.visits, newVisit]} 
      })
      history.push(`${match.url}`);
    })
    .catch((data) => {
      setLoading(false)
      setErrors(data.errors);
    });
  }  
  
  return (
    <Form onSubmit={handleVisitSubmit} autoComplete="off">

      <input name="images" type="file" accept="image/*" multiple={true} onChange={handleImageChange} />

      <textarea 
        type="text"
        name="journal"
        onChange={handleChange}
        value={formData.journal}
        placeholder="Journal Entry"
      /> 
      <textarea 
        type="text"
        name="review"
        onChange={handleChange}
        value={formData.review}
        placeholder="Leave a Review"
      />
      <label htmlFor="score">Rate Your Visit: {formData.score}</label>
        <input
        id="score"
        type="range"
        name="score"
        onChange={handleChange}
        value={formData.score}
        min="1"
        max="5"
        step="1"
      />
      {loadingComponent}
      {errors && errors.map((error) => (
          <p key={error} style={{ color: "red" }}>
            {error}
          </p>
      ))}
      <button type="submit" disabled={loading}>Submit</button>
    </Form>
  )
}

export default NewVisitForm

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  padding-bottom: 10px;
  padding-top: 30px;
  

  input[type="file"]::file-selector-button  {
    font-size: 18px;
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    border: 1px solid var(--yellow);
    outline: none;
    margin-bottom: 10px;
  }

  textarea {
    width: 400px;
    text-align: center;
    padding-top: 5px;
  }
`
