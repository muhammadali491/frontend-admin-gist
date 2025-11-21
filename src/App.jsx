import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import OurFaculty from "./routes/OurFaculty";
import OurCourses from "./routes/OurCourses";
import GalleryPage from "./routes/GalleryPage";
import SignIn from "./routes/SignIn";
import { useSelector } from "react-redux";
import Addmissions from "./routes/Addmissions";
import Messages from "./routes/Messages";

const App = () => {
  const { token } = useSelector((state) => state.admin); // read login state

  return (
    <>
      {token && <Header />} {/* show header only if logged in */}
      <Routes>
        {!token ? (
          <Route path="/" element={<SignIn />} />
        ) : (
          <>
            <Route path="/" element={<OurFaculty />} />
            <Route path="/courses" element={<OurCourses />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/join" element={<Addmissions />} />
          </>
        )}
        {/* Optional: redirect unknown routes */}
        <Route path="*" element={<Navigate to={token ? "/" : "/"} />} />
      </Routes>
    </>
  );
};

export default App;
