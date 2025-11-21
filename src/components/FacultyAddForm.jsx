import React, { useState } from "react";

function FacultyAddForm({ add, onClose, onAdd }) {
  if (!add) return null;

  const [facultyData, setFacultyData] = useState({
    file: null,
    name: "",
    position: "",
    imgSrc: null,
    description: "",
    qualification: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFacultyData({
      ...facultyData,
      file,
      imgSrc: URL.createObjectURL(file),
    });
  };

  const handleSubmit = () => {
    if (!facultyData.name) {
      return;
    }

    // pass data to parent to send to backend
    onAdd(facultyData);
    onClose();
  };

  return (
    <div id="id01" className="modal" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content animate-top card-4"
        style={{ padding: 0 }}
      >
        <header className="container red">
          <span onClick={onClose} className="button blue display-topright">
            ×
          </span>
          <h2 className="center">Add Faculty</h2>
        </header>

        <div className="container" style={{ padding: 0 }}>
          <div className="col l6 m6 s12 green center">
            <div className="image-preview-wrapper display-container">
              <img
                src={facultyData.imgSrc || ""}
                alt="preview"
                className="image-preview"
              />

              <label className="change-image-label">
                Add Image
                <input type="file" accept="image/*" onChange={handleFile} />
              </label>
            </div>
          </div>

          <div className="col l6 m6 s12 light-gray center">
            <div className="padding">
              <input
                name="name"
                placeholder="Name"
                className="input margin-bottom"
                onChange={handleChange}
              />
              <input
                name="position"
                placeholder="Position"
                className="input margin-bottom"
                onChange={handleChange}
              />
              <input
                name="qualification"
                placeholder="Qualification"
                className="input margin-bottom"
                onChange={handleChange}
              />
              <input
                name="experience"
                placeholder="Experience"
                className="input margin-bottom"
                onChange={handleChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                className="input margin-bottom"
                onChange={handleChange}
              />

              <button
                onClick={handleSubmit}
                className="button red round block margin-right"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyAddForm;
