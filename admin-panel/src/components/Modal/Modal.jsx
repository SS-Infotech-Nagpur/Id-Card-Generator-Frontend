// src/Modal/Modal.js
import React from 'react';
import "./Modal.css"
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-aos="fade-down">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          
          <div className="modal-body text-center">
            <Link to="/login" type="button" className="btn btn-primary">Get Started with Admin</Link><br />
            <Link to="/studentForm" type="button" className="btn btn-success my-3">Get Started with Student</Link>
          </div>
          
            <button id='close' type="button" className="btn btn-danger w-25" onClick={onClose}>Close</button>
        
        </div>
      </div>
    </div>
  );
};

export default Modal;
