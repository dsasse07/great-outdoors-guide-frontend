import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'


function Portal({ children }) {
  const modalRoot = document.getElementById('modal-root') 
  const [element] = useState(document.createElement('div')) 


  useEffect(() => {
    modalRoot.appendChild(element)

    
    return function cleanup() {
      modalRoot.removeChild(element)
    }
  }, [modalRoot, element])

  return createPortal(children, element)
}


function Modal({ children, toggle, isShown }) {
  return (
    <Portal>
      {isShown && (
        <ModalWrapper onMouseDown={toggle}>
          <ModalBody onClick={event => event.stopPropagation()} onMouseDown={(e)=>e.stopPropagation()}>
            <CloseButton onClick={toggle}>
              &times;
            </CloseButton>
            <Content >
              {children}  
            </Content>
          </ModalBody>
        </ModalWrapper>
      )}
    </Portal>
  )
}

export default Modal
const ModalWrapper = styled.div`
  position: fixed;
  z-index: 5;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);

`

const ModalBody = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  height: 70%;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CloseButton = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`