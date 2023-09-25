// import  from 'react'
import { useEffect } from 'react';

import config from '../Config/config';

import './App.css'

function App() {

  useEffect(() => {
    console.log("working ....")
  })

  console.log(config.appwriteUrl);
  

  return (
    <>
      
      <h1>Blog app from appwrite</h1>
    </>
  )
}

export default App
