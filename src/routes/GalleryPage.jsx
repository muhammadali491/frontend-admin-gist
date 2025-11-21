import "../components/Gallery/OurGallery.css";
import React, { useEffect, useState } from "react";
import GalleryItem from "../components/Gallery/GalleryItem";
import Modal from "../components/Gallery/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addGallery,
  deleteGallery,
  editGallery,
  fetchGallery,
} from "../features/Gallery/GallerySlice";
import NotAvailable from "../components/NotAvailable";
import Loading from "../components/Loading";
import ImageModal from "../components/Gallery/imageModal";
import GalleryAddForm from "../components/Gallery/GalleryAddForm";
import Swal from "sweetalert2";

const GalleryPage = () => {
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
  const [add, setadd] = useState(false);
  const [modalData, setModalData] = useState({
    img: "",
    desc: "",
    open: false,
  });
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [edited, setEdited] = useState({
    _id: "",
    desc: "",
    label: "",
    src: "",

    file: null, // actual file when user uploads
  });

  const enterEditMode = (image) => {
    setEdited({
      _id: image._id,
      desc: image.desc,
      label: image.label,
      src: image.src,
      file: null,
    });
    setEditMode(true);
  };

  const handleCancel = () => {
    setEdited({
      _id: "",
      desc: "",
      label: "",
      src: "",
      file: null,
    });
    setEditMode(false);
  };

  const handleSave = () => {
    setSelected(null);
    const form = new FormData();
    form.append("_id", edited._id);
    form.append("desc", edited.desc);
    form.append("label", edited.label);

    if (edited.file instanceof File) {
      form.append("image", edited.file);
    }

    alert.loading();
    dispatch(editGallery(form))
      .unwrap()
      .then(() => {
        Swal.close();
        alert.success();
        dispatch(fetchGallery());
        handleCancel();
        setSelected(null);
      })
      .catch((err) => {
        alert.error();
        console.error("Failed to update:", err);
      });
  };

  const handleAddGallery = async (data) => {
    setSelected(null);
    const form = new FormData();
    form.append("file", data.file);
    form.append("label", data.label);
    form.append("desc", data.desc);
    // Inspect the REAL FormData contents:

    alert.loading();
    dispatch(addGallery(form))
      .unwrap()
      .then(() => {
        Swal.close();
        alert.success();
        dispatch(fetchGallery());
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
    dispatch(deleteGallery(id))
      .unwrap()
      .then(() => {
        Swal.close();
        alert.success();
        dispatch(fetchGallery());
        handleCancel();
        setSelected(null);
      })
      .catch((err) => {
        alert.error;
        console.error("Failed to delte Gallery:", err);
      });
  };

  const dispatch = useDispatch();
  let { gallery, status } = useSelector((state) => state.gallery);
  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "failed") {
    return <div>Error loading gallery.</div>;
  }
  if (!gallery || gallery.length === 0) {
    return <NotAvailable item="Gallery" />;
  }

  let images = gallery.data.gallery;
  // images.map((img) => {
  //   console.log(img);
  // });
  // console.log(images);
  return (
    <>
      <button
        style={{ position: "fixed", bottom: "5%", right: "5%", zIndex: "999" }}
        className="button ripple red circle  xlarge"
        onClick={() => setadd(true)}
      >
        +
      </button>

      <GalleryAddForm
        onAdd={handleAddGallery}
        add={add}
        onClose={() => setadd(false)}
      />
      <section className="section about auto ">
        <h3>
          Glamour <span> Moments</span>
        </h3>

        <div className="row-padding box padding-32">
          {images.map((img, idx) => (
            <div key={idx} className="col s12 m6 l3 margin-bottom">
              <GalleryItem
                image={img}
                key={idx}
                // onClick={() => openModal(img.src, img.desc)}
                onClick={setSelected}
              />
            </div>
          ))}
        </div>

        <ImageModal
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

export default GalleryPage;
