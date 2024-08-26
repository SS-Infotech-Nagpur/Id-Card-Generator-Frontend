import React from 'react'
import { Link } from 'react-router-dom'

const SelectPanel = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-white">
    <h2 className="mb-4">Select an Option</h2>
    <div className="d-flex flex-column gap-3">
      <Link to="/schoolForm" className="btn btn-primary btn-lg">School Registration</Link>
      <Link to="/studentForm" className="btn btn-secondary btn-lg">Student Registration</Link>
    </div>
  </div>
  )
}

export default SelectPanel