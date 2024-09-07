import './App.css'
import React from 'react'
import { useState } from 'react';

function App() {

  return (
    <>
      <LikeButton />
    </>
  )
}

function LikeButton() {
  const [count, setCount] = useState(100)

  function handleClick() {
    setCount(count + 1)
  }
  return (
    <span className='like-button' onClick={handleClick}>❤️ {count}</span>
  )
}

export default App
