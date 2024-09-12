// src/Dashboard/Dashboard.js
import React, { useState } from "react";
import "../Dashboard/Style.css";
import Navbar from "../Navbar";
import Modal from "../Modal/Modal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPopup = () => setIsModalOpen(true);
  const closePopup = () => setIsModalOpen(false);

  return (
    <>
      <Navbar />
      <div className="container2">
        <div className="left" data-aos="fade-right">
          <h2>
            MAKING ID CARDS HAS NEVER
            <br /> BEEN EASIER!
          </h2>
          <p>
            Create Professional and high-quality ID Badges in a<br /> matter of
            minutes with our easy-to-use Badge Maker!
          </p>
          <button onClick={openPopup} className="shadow btn btn-success px-5 py-2 rounded">
            <b>Get Started</b>
          </button>
        </div>
        <div className="right" data-aos="fade-left">
          <img src="src/images/img1.jpg" alt="ID Badge Maker" />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closePopup} />
    </>
  );
};

export default Dashboard;