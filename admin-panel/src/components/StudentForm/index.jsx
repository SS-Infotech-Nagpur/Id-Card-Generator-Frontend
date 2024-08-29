import React, { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import "./StudentForm.css";
import WebCam from "../Webcam/WebCam";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const StudentForm = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [image, getImage] = useState(null);
  const [formData, setFormData] = useState({
    schoolName: "",
    studentName: "",
    className: "",
    section: "",
    dateOfBirth: "",
    bloodGroup: "",
    mobileNumber: "",
    address: "",
    photo: null,
    idCardPhoto: null,
  });
  const [selectedSchoolDetail, setSelectedSchoolDetail] = useState({});

  useEffect(() => {
    axios
      .get("http://192.168.0.139:8080/school/list")
      .then((response) => {
        const schools = response.data.map((item) => ({
          schoolName: item.schoolName,
          schoolId: item.schoolId,
        }));
        setOptions(schools);
        setFilteredOptions(schools);
      })
      .catch((error) => {
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
      .get(`http://192.168.0.139:8080/school/id/${schoolId}`)
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
    for (let key in formData) {
      if (formData[key] === "" && key !== "photo" && key !== "idCardPhoto") {
        alert(`${key} is required.`);
        return;
      }
    }

    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://192.168.0.139:8080/student/save",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
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
    const previewElement = document.querySelector('.card-frame');

    if (previewElement) {
      html2canvas(previewElement).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'student-preview.jpg';
        link.click();
      });
    }
  };

  const [studentLength,setStudentLength] = useState("");
  useEffect(()=>{
    const handleStudentName=()=>{
      const length = formData.studentName.length;
      
      const getLength = length > 20 ? "padding" : "lessPadding";

      setStudentLength(getLength)
    }
    handleStudentName();
  },[formData.studentName])

  return (
    <>
      <button className='btn btn-outline-primary mx-4 px-4 fs-5' onClick={back}><BiArrowBack /></button>
      <div className="form w-75">
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
            className="rounded mb-3 p-1"
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
          <label htmlFor="template"> Upload Id Card Photo</label>
          <br />
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            aria-label="Photo"
            className="btn btn-light"
            id="template"
            required
          />
          <br />
          <label htmlFor="idCardPhoto">Student Photo</label>
          <br />
          <input
            type="file"
            name="idCardPhoto"
            onChange={handleChange}
            aria-label="Student Photo"
            className="btn btn-light"
            id="idCardPhoto"
          />
          <br />
          <label htmlFor="">Capture Image</label>
          <div style={{
            position: "relative",
            right: "20%",
          }}>
            <WebCam getImage={getImage} />
          </div>

          <button
            type="button"
            onClick={checkPreview}
            className="btn btn-primary last-btn"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-success mx-4 last-btn"
          >
            Send
          </button>
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
                  <p className="email">Email: {selectedSchoolDetail.schoolEmail}</p>
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
                {formData.idCardPhoto ?
                  <img
                    src={URL.createObjectURL(formData.idCardPhoto)}
                    alt="ID Card"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "1.5rem",
                    }}
                  /> : <img
                    src={image}
                    alt="ID Card"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "1.5rem",
                    }}
                  />
                }
                <p id="previewStudentName"
                 className={`${studentLength}`}
                >
                  <strong>Student Name </strong>{" "}
                  <span className="studentDetails">
                    {" "}
                    : <div className="colon" id="colon1">{formData.studentName}</div>
                  </span>
                </p>
                <p>
                  <strong>Class Name </strong>{" "}
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
                    : <span className="colon" id="colonAddress">{formData.address}</span>
                  </span>
                </p>
              </div>
            </div>
            <button className="btn btn-success download" onClick={downloadPreview}>Download</button>
          </>
        )}
      </div>
    </>
  );
};

export default StudentForm;
