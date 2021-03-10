import React from 'react'
import styled from 'styled-components'

function PhotoPreview({image, onDelete, id}) {

  function handleImageDelete(){
    onDelete(id)
  }

  return (
    <Container>
      <img src={image} alt={id}/>
      <DeleteButton onClick={handleImageDelete}>
        X
      </DeleteButton>
    </Container>

  )
}

export default PhotoPreview

const Container = styled.div`
  position: relative;
  max-width: 150px;
  min-width: 80px;
  max-height: 150px;
  min-height: 80px;
  border-radius: 8px;
  /* border: 2px solid red; */
  box-shadow: 1px 1px 1px 2px gray;
  padding: 6px;

  img{
    width: 100%
  }
`

const DeleteButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  display: block;
  border-radius: 50%;
  background: firebrick;
  border: 1px solid gray;
  color: white;
  font-weight: bold;
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
  outline: none;
  box-shadow: 1px 1px 1px 1px black;

  :hover {
    background: red;
  }

`