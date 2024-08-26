import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SelectPanel from "./components/SelectPanel";
import SchoolForm from "./components/SchoolForm";
import StudentForm from "./components/StudentForm";
import PageNotFound from "./components/PageNotFound";
//git check 2
function App() {
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
