import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SchoolForm from "./components/SchoolForm";
import StudentForm from "./components/StudentForm";
import PageNotFound from "./components/PageNotFound";
import { useEffect } from "react";
import Aos from 'aos';
import "aos/dist/aos.css"


function App() {
  useEffect(()=>{
    Aos.init( {
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
   
  },[])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/schoolForm" element={<SchoolForm />} />
          <Route path="/studentForm" element={<StudentForm />} />

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
