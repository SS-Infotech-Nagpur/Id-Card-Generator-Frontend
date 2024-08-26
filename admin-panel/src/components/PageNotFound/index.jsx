import React from 'react'
import { Link } from 'react-router-dom'
import "./Style.css"

const PageNotFound = () => {
  return (
    <>
      <div className='container p-5 text-center error404'>
      <img className='m-4' src="src\images\error404.jpg" alt="page not fount" /><br /><br />
      <Link to="/" className='btn btn-primary w-50'>Go to Home Page</Link>
      </div>
    </>
 
  )
}

export default PageNotFound