import React from "react";
import "../Navbar/Style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
      <img src=".././src/images/logo.jpg" alt="/logo" style={{height:"40px", width:"60px" , borderRadius:"10px"}} />

        <a className="navbar-brand text-light" href="#">
          ID Card Generator
        </a>
       
      </div>
    </nav>
  );
};

export default Navbar;
