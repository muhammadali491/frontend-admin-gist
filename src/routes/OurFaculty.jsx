import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFaculty,
  editFaculty,
  addFaculty,
  deleteFaculty,
} from "../features/Faculty/FacultySlice";
import FacultyCard from "../components/FacultyCard";
import FacultyModal from "../components/FacultyModal";
import Loading from "../components/Loading";
import NotAvailable from "../components/NotAvailable";
import "./facultyGallery.css";
import "./OurCourses.css";
import "./Homepage.css";
import FacultyAdd from "../components/FacultyAdd";
import FacultyAddForm from "../components/FacultyAddForm";
import Swal from "sweetalert2";

const OurFaculty = () => {
  const [add, setadd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [edited, setEdited] = useState({
    _id: "",
    name: "",
    position: "",
    qualification: "",
    experience: "",
    description: "",
    imgSrc: "", // string URL (from DB or preview)
    file: null, // actual file when user uploads
  });

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

  const dispatch = useDispatch();
  let { faculty, status } = useSelector((state) => state.faculty);

  useEffect(() => {
    dispatch(fetchFaculty());
  }, [dispatch]);

  if (status === "loading") return <Loading />;
  if (status === "failed") return <div>Error loading faculty.</div>;
  if (!faculty || faculty.length === 0) return <NotAvailable item="faculty" />;

  faculty = faculty?.data?.faculty || [];

  const enterEditMode = (facultyMember) => {
    setEdited({
      _id: facultyMember._id,
      name: facultyMember.name,
      position: facultyMember.position,
      qualification: facultyMember.qualification,
      experience: facultyMember.experience,
      description: facultyMember.description,
      imgSrc: facultyMember.imgSrc || "", // <- THIS WAS MISSING
      file: null,
    });
    setEditMode(true);
  };

  const handleCancel = () => {
    setEdited({
      _id: "",
      name: "",
      position: "",
      qualification: "",
      experience: "",
      description: "",
      imgSrc: "", // <- THIS WAS MISSING
      file: null,
    });
    setEditMode(false);
  };

  const handleDelete = (id) => {
    alert.loading();
    dispatch(deleteFaculty(id))
      .unwrap()
      .then(() => {
        Swal.close();
        alert.success();
        dispatch(fetchFaculty());
        handleCancel();
        setSelected(null);
      })
      .catch((err) => {
        alert.error();
        console.error("Failed to delte faculty:", err);
      });
  };

  const handleSave = () => {
    setSelected(null);

    const form = new FormData();
    form.append("_id", edited._id);
    form.append("name", edited.name);
    form.append("position", edited.position);
    form.append("qualification", edited.qualification);
    form.append("experience", edited.experience);
    form.append("description", edited.description);

    if (edited.file instanceof File) {
      form.append("image", edited.file);
    }
    alert.loading();

    dispatch(editFaculty(form))
      .unwrap()
      .then(() => {
        Swal.close();
        alert.success();
        dispatch(fetchFaculty());
        handleCancel();
        setSelected(null);
      })
      .catch((err) => {
        alert.error();
        console.error("Failed to update:", err);
      });
  };

  const handleAddFaculty = async (data) => {
    setSelected(null);
    const form = new FormData();
    form.append("file", data.file);
    form.append("name", data.name);
    form.append("position", data.position);
    form.append("qualification", data.qualification);
    form.append("experience", data.experience);
    form.append("description", data.description);

    alert.loading();
    dispatch(addFaculty(form))
      .unwrap()
      .then(() => {
        Swal.close();
        alert.success();
        dispatch(fetchFaculty());
        setadd(false);
      })
      .catch((err) => {
        alert.error();
        console.error("Failed to add:", err);
      });
  };

  return (
    <>
      <button
        style={{ position: "fixed", bottom: "5%", right: "5%", zIndex: "999" }}
        className="button ripple red circle  xlarge"
        onClick={() => setadd(true)}
      >
        +
      </button>

      <FacultyAddForm
        onAdd={handleAddFaculty}
        add={add}
        onClose={() => setadd(false)}
      />

      <section className="section courses-preview-section">
        <div className="swiper-slide">
          {faculty.map((member, index) => (
            <FacultyCard
              key={index}
              facultyMember={member}
              onClick={setSelected}
            />
          ))}
        </div>

        <FacultyModal
          selected={selected}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelected={setSelected}
          edited={edited}
          setEdited={setEdited}
          handleSave={handleSave}
          handleCancel={handleCancel}
          enterEditMode={enterEditMode}
          handleDelete={handleDelete}
        />
      </section>
    </>
  );
};

export default OurFaculty;
