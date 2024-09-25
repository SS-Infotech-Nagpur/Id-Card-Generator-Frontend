import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Style.css"
import { BiArrowBack } from "react-icons/bi";

const PageNotFound = () => {
  const navigate = useNavigate();

  const back = () =>{
    navigate(-1)
  }

  return (
    <>
     <button className='btn btn-outline-primary mx-4 px-4 fs-5' onClick={back}><BiArrowBack /></button>
      <div className='container p-5 text-center error404'>
      <img className='m-4' src="../src/images/error404.jpg" alt="page not fount" /><br /><br />
      <Link to="/" className='btn btn-primary w-50'>Go to Home Page</Link>
   
      </div>
    </>
 
  )
}

export default PageNotFound