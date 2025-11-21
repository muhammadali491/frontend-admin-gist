import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import FacultyEditForm from "../FacultyEditForm";
import FacultyView from "../FacultyView";
import "../FacultyModal.css";
import ImageEditForm from "./GalleryEditForm";
import ImageViewForm from "./GalleryViewForm";
const ImageModal = ({
  handleDelete,
  selected,
  editMode,
  setEditMode,
  setSelected,
  edited,
  setEdited,
  handleSave,
  handleCancel,
  enterEditMode,
}) => {
  if (!selected) return null;

  return (
    <div className="gallery-modal">
      <div
        className="gallery-modal-content display-container modern-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn display-topright">
          <IoCloseCircle
            onClick={() => {
              handleCancel();
              setSelected(null);
            }}
            size={30}
          />
        </button>

        <div className="modal-left  ">
          <div className="image-preview-wrapper display-container">
            <img
              src={
                edited.file
                  ? URL.createObjectURL(edited.file)
                  : edited.src || selected.src
              }
              alt="Faculty"
              className="image-preview"
            />

            {editMode && (
              <div className="image-controls">
                <label className="change-image-label">
                  Change Image
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setEdited({
                          ...edited,
                          file: file,
                          src: URL.createObjectURL(file),
                        });
                      }
                    }}
                  />
                </label>
                <button
                  onClick={() => setEdited({ ...edited, imgSrc: "" })}
                  className="remove-image-btn"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="modal-right modal-text border">
          {editMode ? (
            <ImageEditForm
              edited={edited}
              setEdited={setEdited}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          ) : (
            <ImageViewForm
              handleDelete={handleDelete}
              selected={selected}
              onEdit={() => enterEditMode(selected)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
