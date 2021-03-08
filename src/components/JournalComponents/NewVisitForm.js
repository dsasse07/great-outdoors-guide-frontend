import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import ActiveParkContext from "../ActiveParkContext";

function NewVisitForm({currentUser}) {
  console.log(currentUser)
  const history = useHistory();
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

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormData({
        ...formData,
        [name]: value,
    });
  }

  function handleImageChange(event){
    console.log("files",event.target.files[0])
    const name = event.target.name;
    const files = event.target.files;
    console.log("files",{images: files})
    
    // for (let i = 0; i < files.length; i++) {
      setFormData({...formData, images: files })
  }
    // let value = event.target.files[0]
    // let value = event.target.files.forEach((file) => fileData.append('files[]', file));
    // console.log(event)
    // setFormData({
    //     ...formData,
    //     [name]: value,
    // });
  
  console.log("New Visit",formData)

  function handleVisitSubmit(e) {
    const newVisitObj= {
      journal: formData.journal,
      review: formData.review,
      score: formData.score,
      code: formData.code,
      images: formData.images,
      user_id: formData.user_id
    }

    e.preventDefault();
    // fetch("http://localhost:3000/login", {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/visits`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: newVisitObj,
    })
    .then((r) => r.json())
    .then((newVisit) => {
      console.log(newVisit);
      
      // history.push(``);
    })
    .catch((data) => {
      setErrors(data.errors);
    });
  }
  return (
    <Form onSubmit={handleVisitSubmit} autoComplete="off">

      <input type="file" accept="image/*" multiple={true} onChange={handleImageChange} />

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
      {errors && errors.map((error) => (
          <p key={error} style={{ color: "red" }}>
            {error}
          </p>
      ))}
      <button type="submit">Submit</button>
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
