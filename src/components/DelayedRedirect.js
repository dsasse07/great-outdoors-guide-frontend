import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'

function DelayedRedirect({currentUser}) {
  const [redirect, setRedirect] = useState(false)
  let timer 

  useEffect ( () => {
    timer = setTimeout(() => {setRedirect(true)}, 500)

    return ( () => {
      setRedirect(false)
      clearInterval(timer)
    })
  }, [])

  useEffect ( () => {
    if (currentUser) clearInterval(timer)
  }, [currentUser, timer])
  
  return (
    <>
      {redirect && 
        <Redirect to='/login' /> 
      }
    </>
  )
}

export default DelayedRedirect
