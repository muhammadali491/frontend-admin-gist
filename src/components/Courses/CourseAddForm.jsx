import React, { useState } from "react";

function CourseAddForm({ add, onClose, onAdd }) {
  if (!add) return null;

  const [courseData, setcourseData] = useState({
    title: "",
    instructor: "",
    subtitle: "",
    intro: "",
    description: "",
    duration: "",
    image: "",
    file: null,
  });

  const handleChange = (e) => {
    setcourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setcourseData({
      ...courseData,
      file,
      image: URL.createObjectURL(file),
    });
  };

  const handleSubmit = () => {
    if (!courseData.title) {
      return;
    }

    // pass data to parent to send to backend
    onAdd(courseData);
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
          <h2 className="center">Add Course</h2>
        </header>

        <div className="container" style={{ padding: 0 }}>
          <div className="col l6 m6 s12 green center">
            <div className="image-preview-wrapper display-container">
              <img
                src={courseData.image || ""}
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
                name="title"
                placeholder="title"
                className="input margin-bottom"
                onChange={handleChange}
              />
              <input
                name="instructor"
                placeholder="instructor"
                className="input margin-bottom"
                onChange={handleChange}
              />
              <input
                name="subtitle"
                placeholder="subtitle"
                className="input margin-bottom"
                onChange={handleChange}
              />
              <input
                name="intro"
                placeholder="intro"
                className="input margin-bottom"
                onChange={handleChange}
              />
              <input
                name="duration"
                placeholder="duration"
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

export default CourseAddForm;
