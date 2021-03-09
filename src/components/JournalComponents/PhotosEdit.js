import React from 'react'
import PhotoPreview from './PhotoPreview'
import styled from 'styled-components'

function PhotosEdit({handleUpdateSubmit, handleModalToggle, visit, onImageDelete}) {

  const photoComponents = visit.images.map( image => {
    return <PhotoPreview key={image.signed_id} image={image.url} id={image.signed_id} onDelete={handleDeleteImage}/>
  })

  function handleDeleteImage(id){
    console.log('id', id) 
   // const remainingImages = visit.images.filter( image => {
    //   return image !== deletedImage
    // })

    fetch(`${process.env.REACT_APP_BACKEND_URL}/images/${id}`, {method: "DELETE"} )
    // onImageDelete(remainingImages)
  }

  return (
    <>
      <Header>
        <h1>Edit Your Trip Photos</h1>
      </Header>
      <FormContainer>
        <form onSubmit={handleUpdateSubmit}>
          Upload New Files Here
        </form>
      </FormContainer>
      <ThumnbailContainter>
        <Thumbnails>
          {photoComponents}
        </Thumbnails>
      </ThumnbailContainter>
      <button onClick={handleModalToggle}>Cancel</button>
    </>
  )
}

export default PhotosEdit

const Header = styled.div`

`

const ThumnbailContainter = styled.div`
  overflow: hidden;
  width: 80%;
  border: 1px solid var(--md-green);
  min-height: 300px;
  max-height: 60%;
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
