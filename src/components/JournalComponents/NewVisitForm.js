import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import ActiveParkContext from "../ActiveParkContext";

function NewVisitForm({currentUser}) {
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

    const name = event.target.name;
    // const value = event.target.files[0];
    const value = event.target.files;

    
  //   // for (let i = 0; i < files.length; i++) {
  //     setFormData({...formData, images: files })
  // }
    // let value = event.target.files[0]
    // let value = event.target.files.forEach((file) => fileData.append('files[]', file));
  
    setFormData({
        ...formData,
        [name]: value,
    });
  }
  
  console.log("New Visit",formData)

  function handleVisitSubmit(e) {
    // const newVisitObj= {
    //   journal: formData.journal,
    //   review: formData.review,
    //   score: formData.score,
    //   code: formData.code,
    //   images: formData.images,
    //   user_id: formData.user_id
    // }
    e.preventDefault();
    const visitFormData = new FormData();
    visitFormData.append('journal', formData.journal);
    visitFormData.append('review', formData.review);
    visitFormData.append('score', formData.score);
    visitFormData.append('code', formData.code);
    // visitFormData.append('images', formData.images);
    visitFormData.append('user_id', formData.user_id);
    
    for (var i=0; i < formData.images.length; i++) {
      visitFormData.append('images[]', formData.images[i])
    }

      console.log("visit",visitFormData)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/visits`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: visitFormData,
    })
    .then((r) => r.json())
    .then((newVisit) => {
      console.log("Submission",newVisit);
      
      // history.push(``);
    })
    .catch((data) => {
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
