import { useDispatch, useSelector } from "react-redux";
import "./OurCourses.css";
import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5"; // ✅ Import the icon
import Loading from "../components/Loading";
import NotAvailable from "../components/NotAvailable";
import "./Homepage.css";
import "./facultyGallery.css";
import CourseCard from "../components/Courses/CoursesCard";
import CourseModal from "../components/Courses/CourseModal";
import Swal from "sweetalert2";

// import { fetchFaculty, editFaculty } from "../features/Faculty/FacultySlice";
import {
  fetchCourses,
  editCourse,
  addCourse,
  deleteCourse,
} from "../features/Courses/CoursesSlice";
import CourseAddForm from "../components/Courses/CourseAddForm";

const OurCourses = () => {
  const [add, setadd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [edited, setEdited] = useState({
    _id: "",
    title: "",
    instructor: "",
    subtitle: "",
    intro: "",
    imgSrc: "", // string URL (from DB or preview)
    file: null, // actual file when user uploads
  });
  const dispatch = useDispatch();

  const alert = {
    loading: () =>
      Swal.fire({
        title: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      }),
    success: () =>
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Operation successfull",
        confirmButtonText: "OK",
      }),
    error: () =>
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Operation Failed, try again",
        confirmButtonText: "OK",
      }),
  };

  let { courses, status } = useSelector((state) => state.courses);
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  //loading
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (status === "loading") {
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <h1 style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
            App Ready
          </h1>
        )}
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div>
        <h1>Request pending wait</h1>
      </div>
    );
  }
  if (status === "failed") {
    return <div>Error loading courses.</div>;
  }
  if (!courses || courses.length === 0) {
    return <NotAvailable item="Courses" />;
  }

  const handleCancel = () => {
    setEdited({
      _id: "",
      title: "",
      instructor: "",
      subtitle: "",
      intro: "",
      imgSrc: "", // string URL (from DB or preview)
      file: null, // actual file when user uploads
    });
    setEditMode(false);
  };

  const handleSave = () => {
    setSelected(null);
    const form = new FormData();
    form.append("_id", edited._id);
    form.append("title", edited.title);
    form.append("instructor", edited.instructor);
    form.append("subtitle", edited.subtitle);
    form.append("intro", edited.intro);
    form.append("description", edited.description);
    form.append("duration", edited.duration);

    if (edited.file instanceof File) {
      form.append("image", edited.file);
    }
    alert.loading();
    dispatch(editCourse(form))
      .unwrap()
      .then(() => {
        Swal.close();
        alert.success();
        dispatch(fetchCourses());
        handleCancel();
        setSelected(null);
      })
      .catch((err) => {
        alert.error();
        console.error("Failed to update:", err);
      });
  };

  const enterEditMode = (course) => {
    setEdited({
      _id: course._id,
      title: course.title,
      instructor: course.instructor,
      subtitle: course.subtitle,
      intro: course.intro,
      duration: course.duration,
      description: course.description,
      imgSrc: course.image || "", // string URL (from DB or preview)
      file: null, // actual file when user uploads
    });
    setEditMode(true);
  };

  const handleAddCourse = async (data) => {
    setSelected(null);
    const form = new FormData();
    form.append("file", data.file);
    form.append("title", data.title);
    form.append("instructor", data.instructor);
    form.append("subtitle", data.subtitle);
    form.append("intro", data.intro);
    form.append("description", data.description);
    form.append("duration", data.duration);
    // Inspect the REAL FormData contents:
    alert.loading();
    dispatch(addCourse(form))
      .unwrap()
      .then(() => {
        Swal.close();
        alert.success();
        dispatch(fetchCourses());
        setadd(false);
      })
      .catch((err) => {
        alert.error();
        console.error("Failed to add:", err);
      });
  };

  const handleDelete = (id) => {
    setSelected(null);
    alert.loading();
    dispatch(deleteCourse(id))
      .unwrap()
      .then(() => {
        Swal.close();
        alert.success();
        dispatch(fetchCourses());
        handleCancel();
        setSelected(null);
      })
      .catch((err) => {
        alert.error();
        console.error("Failed to delete course:", err);
      });
  };

  const style = {
    padding: "80px 20px",
    maxWidth: "1200px",
    margin: "auto",
  };

  courses = courses?.data?.courses || [];
  return (
    <>
      <button
        style={{ position: "fixed", bottom: "5%", right: "5%", zIndex: "999" }}
        className="button ripple red circle  xlarge"
        onClick={() => setadd(true)}
      >
        +
      </button>

      <CourseAddForm
        onAdd={handleAddCourse}
        add={add}
        onClose={() => setadd(false)}
      />
      <section className="courses-preview-section">
        <div className="courses-grid" style={style}>
          {courses.map((course, index) => (
            <CourseCard course={course} key={index} onClick={setSelected} />
          ))}
        </div>
        {/* Modal */}
        <CourseModal
          handleDelete={handleDelete}
          selected={selected}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelected={setSelected}
          edited={edited}
          setEdited={setEdited}
          handleSave={handleSave}
          handleCancel={handleCancel}
          enterEditMode={enterEditMode}
        />
      </section>
    </>
  );
};

export default OurCourses;
