import React, { useState } from "react";
import axios from "axios";
import "./SchoolForm.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SchoolForm = () => {
  const [formData, setFormData] = useState({
    schoolInitials: "",
    schoolName: "",
    schoolAddress: "",
    schoolContactNumber: "",
    schoolWebsite: "",
    schoolEmail: "",
    schoolLogo: "",
  });
  const [isPreview, setIsPreview] = useState(false);
  const [previewLogoURL, setPreviewLogoURL] = useState(null); // State for preview logo URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // Store the file object
      });
      setPreviewLogoURL(URL.createObjectURL(files[0])); // Create a preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] instanceof File) {
        data.append(key, formData[key]); // Append files as is
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      // Send POST request
      const response = await axios.post(
        "http://192.168.203.14:8080/school/save",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("School created successfully", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
      console.log("Success:", response.data);

    } catch (error) {
      toast.error("Try again ! Make sure your internet is connected", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePreview = (e) => {
    e.preventDefault(); // Prevent form submission when clicking the preview button
    setIsPreview(true);
  };

  const navigate = useNavigate();

  const back = () =>{
    navigate(-1)
  }

  return (
    <>
     <button className='btn btn-outline-primary mx-4 px-4 fs-5' onClick={back}><BiArrowBack /></button>
    <div className="container w-75 mt-5 form" data-aos="zoom-in">
      <h2>School Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="schoolInitials" className="form-label">
            School Initials
          </label>
          <input
            type="text"
            id="schoolInitials"
            name="schoolInitials"
            className="form-control"
            value={formData.schoolInitials}
            onChange={handleChange}
            placeholder="Enter school initials"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="schoolName" className="form-label">
            School Name
          </label>
          <input
            type="text"
            id="schoolName"
            name="schoolName"
            className="form-control"
            value={formData.schoolName}
            onChange={handleChange}
            placeholder="Enter school name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="schoolAddress" className="form-label">
            School Address
          </label>
          <input
            type="text"
            id="schoolAddress"
            name="schoolAddress"
            className="form-control"
            value={formData.schoolAddress}
            onChange={handleChange}
            placeholder="Enter school address"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="schoolContactNumber" className="form-label">
            School Contact Number
          </label>
          <input
            type="text"
            id="schoolContactNumber"
            name="schoolContactNumber"
            className="form-control"
            value={formData.schoolContactNumber}
            onChange={handleChange}
            placeholder="Enter school contact number"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="schoolWebsite" className="form-label">
            School Website
          </label>
          <input
            type="text"
            id="schoolWebsite"
            name="schoolWebsite"
            className="form-control"
            value={formData.schoolWebsite}
            onChange={handleChange}
            placeholder="Enter school website URL"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="schoolEmail" className="form-label">
            School Email
          </label>
          <input
            type="email"
            id="schoolEmail"
            name="schoolEmail"
            className="form-control"
            value={formData.schoolEmail}
            onChange={handleChange}
            placeholder="Enter school email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="schoolLogo" className="form-label">
            School Logo
          </label>
          <input
            type="file"
            id="schoolLogo"
            name="schoolLogo"
            className="form-control"
            onChange={handleFileChange}
            required
          />
          <br />
         
          {previewLogoURL && (
            <img
              src={previewLogoURL}
              alt="School Logo"
              className="mt-2"
              style={{ maxWidth: "150px" }}
            />
          )}
        </div>
        <button
          className="btn btn-primary"
          onClick={handlePreview}
        >
          Preview
        </button>
        <button type="submit" className="btn btn-success mx-3">
          Send
        </button>
      </form>

      {isPreview && (
        <div className="preview mt-2">
          <p id="schoolInit" className="text-dark">{formData.schoolInitials}</p>
          <h4>{formData.schoolName}</h4>
          <p id="schoolAdd">{formData.schoolAddress} , {formData.schoolContactNumber}</p>
          <p>{formData.schoolWebsite}</p>
          <p>Email : {formData.schoolEmail}</p>
          {previewLogoURL && (
            <img
              src={previewLogoURL}
              alt="School Logo"
              style={{ maxWidth: "100px"}}
              className="schoolLogo"
            />
          )}
        </div>
      )}
    </div>
    <ToastContainer />
    </>
  );
};

export default SchoolForm;
