import React, { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import "./StudentForm.css";
import WebCam from "../Webcam/WebCam";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentForm = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [image, setImage] = useState(null); // For uploaded photo
  const [webCamImage, setWebCamImage] = useState(null); // For webcam image
  const [formData, setFormData] = useState({
    schoolName: "",
    studentName: "",
    className: "",
    section: "",
    dateOfBirth: "",
    bloodGroup: "",
    mobileNumber: "",
    address: "",
    rollNo:"",
    photo: null,
    idCardPhoto: null,
  });
  const [selectedSchoolDetail, setSelectedSchoolDetail] = useState({});
  const [studentLength, setStudentLength] = useState("");
  const [handleAddressLength , setHandleAddressLength] = useState("");
  const [handleStudentLength , setHandleStudentLength ] = useState("");

  const notify = () => toast("Form Submitted Successfully");

  

  useEffect(() => {
    if (formData.address.length > 30) {
      // Update the address to have only the first 38 characters
      setFormData(prevFormData => ({
        ...prevFormData,
        address: formData.address.substring(0, 30)
        
      }));
      setHandleAddressLength("max length of address is 30 character")
    }

    if (formData.address.length < 30) {
      setHandleAddressLength("")
    }

  }, [formData.address]);

  useEffect(() => {
    if (formData.studentName.length > 18) {
      // Update the address to have only the first 38 characters
      setFormData(prevFormData => ({
        ...prevFormData,
        studentName: formData.studentName.substring(0, 18)
        
      }));
      setHandleStudentLength("max length of address is 18 character")
    }

    if (formData.studentName.length < 18) {
      setHandleStudentLength("")
    }

  }, [formData.studentName]);


  const handleWebCamCapture = (image) => {
    // Ensure that the image is a Blob or File
    if (typeof image === 'string') {
      // Convert data URL to Blob
      fetch(image)
        .then(res => res.blob())
        .then(blob => setWebCamImage(blob))
        .catch(err => console.error('Error converting data URL to Blob:', err));
    } else {
      setWebCamImage(image);
    }
  };

  useEffect(() => {
    axios
      .get("http://192.168.0.113:8080/school/list")
      .then((response) => {
        const schools = response.data.map((item) => ({
          schoolName: item.schoolName,
          schoolId: item.schoolId,
        }));
        setOptions(schools);
        setFilteredOptions(schools);
      })
      .catch((error) => {
        toast.error("Try after some time ! Make sure your internet is connected", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
        });
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.schoolName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectSchool = (schoolName, schoolId) => {
    setSelectedSchool(schoolName);
    setSelectedSchoolId(schoolId);
    setFormData({ ...formData, schoolName: schoolName });
    setIsOpen(false);
    fetchSchoolDetails(schoolId);
  };

  const fetchSchoolDetails = (schoolId) => {
    axios
      .get(`http://192.168.0.113:8080/school/id/${schoolId}`)
      .then((response) => {
        setSelectedSchoolDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching school details:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled
    for (let key in formData) {
      if (formData[key] === "" && key !== "photo" && key !== "idCardPhoto") {
        toast.error(`${key} is required.`); // Use toast.error here
        return;
      }
    }
  
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }
  
    // Ensure the 'photo' field is added to FormData
    if (webCamImage) {
      // Append the webcam image if it is a Blob or File
      data.append("photo", webCamImage, "webcam_photo.jpg"); // Adjust file name as needed
    }
  
    try {
      const response = await axios.post(
        "http://192.168.0.113:8080/student/save",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data);
      toast.success("Form Submitted Successfully", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Try again", {
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
  
  const checkPreview = () => {
    setIsPreview(true);
  };

  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const downloadPreview = () => {
    const previewElement = document.querySelector(".card-frame");

    if (previewElement) {
      html2canvas(previewElement).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "student-preview.jpg";
        link.click();
      });
    }
  };

  useEffect(() => {
    const handleStudentName = () => {
      const length = formData.studentName.length;
      const getLength = length > 20 ? "padding" : "lessPadding";
      setStudentLength(getLength);
    };
    handleStudentName();
  }, [formData.studentName]);

  return (
    <>
       
      <button className="btn btn-outline-primary mx-4 px-4 fs-5" onClick={back}>
      <BiArrowBack />  
      </button>
      <div className="form w-75" data-aos="zoom-in">
        <form id="school-form">
          <h2 id="stdHeading">Student Information</h2>
          <br />

          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle w-75"
              type="button"
              onClick={handleToggle}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              {selectedSchool || "Select School"}
            </button>
            {isOpen && (
              <div className="dropdown-menu show">
                <input
                  type="text"
                  className="form-control w-50"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearchChange}
                />
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <a
                      key={index}
                      className="dropdown-item"
                      href="#"
                      onClick={() =>
                        handleSelectSchool(option.schoolName, option.schoolId)
                      }
                    >
                      {option.schoolName}
                    </a>
                  ))
                ) : (
                  <div className="dropdown-item">No options found</div>
                )}
              </div>
            )}
          </div>

          <br />
          <label htmlFor="studentName">Student Name</label>
          <br />
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            aria-label="Student Name"
            className="rounded p-1"
            id="studentName"
            required
          />
          <br />
          {
            handleStudentLength && <p 
             style={{color:"red", fontSize:"18px",fontWeight:"bold"}}
            >{handleStudentLength}</p>
          }

          <label htmlFor="studetClass">Class Name</label>
          <br />
          <input
            type="text"
            name="className"
            placeholder="Class Name"
            value={formData.className}
            onChange={handleChange}
            aria-label="Class Name"
            className="rounded p-1"
            id="studetClass"
            required
          />
          <br />
          <label htmlFor="section">Section</label>
          <br />
          <input
            type="text"
            name="section"
            placeholder="Section"
            value={formData.section}
            onChange={handleChange}
            aria-label="Section"
            className="rounded p-1"
            id="section"
            required
          />
          <br />
          <label htmlFor="dob">Date Of Birth</label>
          <br />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date Of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            aria-label="Date Of Birth"
            className="rounded mb-3 p-1"
            id="dob"
            required
          />
          <br />
          <label htmlFor="bloodGroup">Blood Group</label>
          <br />
          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleChange}
            aria-label="Blood Group"
            className="rounded p-1"
            id="bloodGroup"
            required
          />
          <br />
          <label htmlFor="number">Mobile Number</label>
          <br />
          <input
            type="number"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            aria-label="Mobile Number"
            className="rounded p-1"
            id="number"
            required
          />
          <br />
          <label htmlFor="address">Address</label>
          <br />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            aria-label="Address"
            className="rounded p-1"
            id="address"
            required
          />
          <br />
          <label htmlFor="rollNo">Roll Number</label>
          <br />
          <input
            type="number"
            name="rollNo"
            placeholder="Roll Number"
            value={formData.rollNo}
            onChange={handleChange}
            aria-label="Roll Number"
            className="rounded p-1"
            id="rollNo"
            required
          />
          <br />
          {
            handleAddressLength && <p 
             style={{color:"red", fontSize:"18px",fontWeight:"bold"}}
            >{handleAddressLength}</p>
          }
          
          <label htmlFor="template">Student Photo</label>
          <br />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            id="template"
            className="bg-light p-2 rounded"
          />

          <br />
          <label htmlFor="idCard">ID Card Photo</label>
          <br />
          <input
            type="file"
            name="idCardPhoto"
            accept="image/*"
            onChange={handleChange}
            id="idCard"
            className="bg-light p-2 rounded"
          />
          <br />
           <div id="webcamToLast">
           <WebCam getImage={handleWebCamCapture} />
           
          <br />
          <button
            type="button"
            className="btn btn-primary my-3"
            onClick={checkPreview}
          >
            Preview
          </button>
          <button
            type="button"
            className="btn btn-success my-3 mx-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
         
          </div>
        </form>

        {selectedSchoolDetail && isPreview && (
          <>
            <div className="card-frame">
              <div className="preview school-preview">
                <p id="schoolInit">{selectedSchoolDetail.schoolInitials}</p>
                <h1 className="clg_name">{selectedSchoolDetail.schoolName}</h1>
                {selectedSchoolDetail.schoolAddress && (
                  <p className="add_num">
                    {selectedSchoolDetail.schoolAddress},{" "}
                    {selectedSchoolDetail.schoolContactNumber}
                  </p>
                )}
                <p className="website">{selectedSchoolDetail.schoolWebsite}</p>
                {selectedSchoolDetail.schoolEmail && (
                  <p className="email">
                    Email: {selectedSchoolDetail.schoolEmail}
                  </p>
                )}
                {selectedSchoolDetail.schoolLogo && (
                  <img
                    className="schoolLogo"
                    src={URL.createObjectURL(selectedSchoolDetail.schoolLogo)}
                    alt="Logo"
                    style={{ maxWidth: "60px", maxHeight: "100px" }}
                  />
                )}
              </div>
              <hr id="hr" />
              <div className="studentpreview">
                {formData.photo ? (
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Student Photo"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "1.5rem",
                    }}
                  />
                ) : webCamImage ? (
                  <img
                    src={URL.createObjectURL(webCamImage)}
                    alt="Webcam Image"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "1.5rem",
                    }}
                  />
                ) : null}
                <p id="previewStudentName" className={`${studentLength}`}>
                  <strong>Student Name </strong>{" "}
                  <span className="studentDetails">
                    {" "}
                    :{" "}
                    <div className="colon" id="colon1">
                      {formData.studentName}
                    </div>
                  </span>
                </p>
                <p>
                  <strong>Class </strong>{" "}
                  <span className="studentDetails">
                    {" "}
                    : <span className="colon">{formData.className}</span>
                  </span>
                </p>
                <p>
                  <strong>Section </strong>{" "}
                  <span className="studentDetails">
                    {" "}
                    : <span className="colon">{formData.section}</span>
                  </span>
                </p>
                <p>
                  <strong>Roll Number </strong>{" "}
                  <span className="studentDetails">
                    {" "}
                    : <span className="colon">{formData.rollNo}</span>
                  </span>
                </p>
                <p>
                  <strong>Date Of Birth </strong>
                  <span className="studentDetails">
                    {" "}
                    : <span className="colon">{formData.dateOfBirth}</span>
                  </span>
                </p>
                <p>
                  <strong>Blood Group </strong>{" "}
                  <span className="studentDetails">
                    {" "}
                    : <span className="colon">{formData.bloodGroup}</span>
                  </span>
                </p>
                <p>
                  <strong>Mobile No</strong>{" "}
                  <span className="studentDetails">
                    {" "}
                    : <span className="colon">{formData.mobileNumber}</span>
                  </span>
                </p>
                <p>
                  <strong>Address </strong>{" "}
                  <span className="studentDetails">
                    {" "}
                    :{" "}
                    <span className="colon" id="colonAddress">
                      {formData.address}
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <button
              className="btn btn-success download"
              onClick={downloadPreview}
            >
              Download
            </button>
          </>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default StudentForm;
