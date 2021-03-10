import React, {useState} from 'react'
import PhotoPreview from './PhotoPreview'
import styled from 'styled-components'

function PhotosEdit({onImageSubmit, handleModalToggle, visit, onImageDelete, currentUser}) {
  const [formData, setFormData] = useState( { images: [] } )
  const photoComponents = visit.images.map( image => {
    return <PhotoPreview key={image.signed_id} image={image.url} id={image.signed_id} onDelete={handleDeleteImage}/>
  })
  const [loading, setLoading] = useState(false)
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

  function handleDeleteImage(id){
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_BACKEND_URL}/images/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    .then( r => {
      if (r.ok) onImageDelete(id)
    })
  }

  function handleImageChange(event){
    const name = event.target.name;
    const value = event.target.files;
    setFormData( {...formData, [name]: value } )
  }

  function handleImagesSubmit(e) {
    setLoading(true)
    const token = localStorage.getItem("token");
    e.preventDefault();
    const imageFormData = new FormData();

    for (let i=0; i < formData.images.length; i++) {
      imageFormData.append('images[]', formData.images[i])
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/visits/${visit.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: imageFormData,
    })
    .then(r => r.json() )
    .then(updatedVisit => {
      setLoading(false)
      onImageSubmit(updatedVisit)
    })
    .catch((data) => {
      setLoading(false)
      setErrors(data.errors);
    });
  }  



  return (
    <>
      <Header>
        <h1>Edit Your Trip Photos</h1>
      </Header>
      <ThumnbailContainter>
        <Thumbnails>
          {photoComponents}
        </Thumbnails>
      </ThumnbailContainter>
      <FormContainer>
        <Form onSubmit={handleImagesSubmit}>
          <label htmlFor="images">
            Upload New Photos
          </label>
          <input id="images" name="images" type="file" accept="image/*" multiple={true} onChange={handleImageChange}/>
          {loadingComponent}
          {errorComponents}
          <input type="submit" value="Submit" disabled={loading}/>
        </Form>
      </FormContainer>
    </>
  )
}

export default PhotosEdit

const Header = styled.div`
  h1 {
    margin: 0;
    padding: 0;
  }
`

const ThumnbailContainter = styled.div`
  overflow: hidden;
  width: 90%;
  /* border: 1px solid var(--md-green); */
  min-height: 300px;
  max-height: 60%;
  box-shadow: 0 0 8px 2px gray;
  padding-top: 20px;
  margin-top: 20px;
`

const Thumbnails = styled.div`
  max-height: 350px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 5px;
`

const FormContainer = styled.div`
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--md-green);
  font-size: 1.5rem;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 1.7rem;

  input[type="file"]::file-selector-button, input[type="submit"]  {
    font-size: 18px;
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    border: 1px solid var(--yellow);
    outline: none;
    margin-bottom: 10px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  input[type="submit"] {   
    font-size: 1.5rem;
    :hover {
      background: var(--yellow);
      color: var(--md-green);
    }
`