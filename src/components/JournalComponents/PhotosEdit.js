import React, {useState} from 'react'
import PhotoPreview from './PhotoPreview'
import styled from 'styled-components'

function PhotosEdit({onImageSubmit, handleModalToggle, visit, onImageDelete, currentUser}) {
  const [formData, setFormData] = useState( { images: [] } )
  const photoComponents = visit.images.map( image => {
    return <PhotoPreview key={image.signed_id} image={image.url} id={image.signed_id} onDelete={handleDeleteImage}/>
  })

  function handleDeleteImage(id){
    fetch(`${process.env.REACT_APP_BACKEND_URL}/images/${id}`, {method: "DELETE"} )
    onImageDelete(id)
  }

  function handleImageChange(event){
    const name = event.target.name;
    const value = event.target.files;
    setFormData( {...formData, [name]: value } )
  }

  function handleImagesSubmit(e) {
    e.preventDefault();
    const imageFormData = new FormData();

    for (let i=0; i < formData.images.length; i++) {
      imageFormData.append('images[]', formData.images[i])
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/visits/${visit.id}`, {
      method: "PATCH",
      body: imageFormData,
    })
    .then(r => r.json() )
    .then(updatedVisit => {
      onImageSubmit(updatedVisit)
      // setCurrentUser(currentUser => {
      //   return {...currentUser, visits: [...currentUser.visits, newVisit]} 
      // })
    })
    // .catch((data) => {
    //   setErrors(data.errors);
    // });
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
          <input type="submit" value="Submit" />
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
`

const FormContainer = styled.div`
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--md-green);
  font-size: 1.5rem;
 

  input[type="file"]::file-selector-button  {
    font-size: 18px;
    border-radius: 8px;
    background: var(--md-green);
    color: var(--yellow);
    border: 1px solid var(--yellow);
    outline: none;
    margin-bottom: 10px;
  }
`