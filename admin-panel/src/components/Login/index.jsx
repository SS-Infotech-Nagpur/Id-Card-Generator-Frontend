import React, { useState } from 'react';
import '../Login/Style.css';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

const Login = () => {

    const navigate = useNavigate();
    const back = () =>{
        navigate(-1)
      }

    const userData={
        userName:"aamil",
        password:"malik"
    }

    const [formData, setFormData] = useState({
     userName:"",
     password:""
    });

    const [error,setError] = useState("");

    const handleChange=(e)=>{
         setFormData((prevData)=>{
          return {...prevData , [e.target.name]:e.target.value}
         })
    }

    const handleSubmit=(e)=>{
     e.preventDefault();
    
     
  if(formData.userName === userData.userName && formData.password === userData.password){
    console.log("login successful")
    console.log(formData);
    navigate("/schoolForm")
  }
  else{
    setError("username and password not match")
    console.log("username and password not match")
  }
  

    }

  return (
    <>
    <button className='btn btn-outline-primary mx-4 px-4 fs-5' onClick={back}><BiArrowBack /></button>
        <div className="login-card-body">
        <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-4 col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-center">Login</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input value={formData.userName} onChange={handleChange} type="text" className="form-control" id="username" placeholder="Enter your username" name='userName' required />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password">Password</label>
                                <input value={formData.password} onChange={handleChange} type="password" className="form-control" id="password" placeholder="Enter your password" name='password' required />
                            </div>
                           {
                            error &&  <p style={{color:"red",fontSize:"20px"}}>{error}</p>
                           }
                            <button type="submit" className="btn btn-primary btn-block mt-4 w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login