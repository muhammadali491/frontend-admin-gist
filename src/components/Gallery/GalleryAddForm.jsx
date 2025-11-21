import React, { useState } from "react";

function GalleryAddForm({ add, onClose, onAdd }) {
  if (!add) return null;

  const [galleryData, setgalleryData] = useState({
    label: "",
    desc: "",
    src: "",
    file: null,
  });

  const handleChange = (e) => {
    setgalleryData({ ...galleryData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setgalleryData({
      ...galleryData,
      file,
      src: URL.createObjectURL(file),
    });
  };

  const handleSubmit = () => {
    if (!galleryData.label) {
      return;
    }

    // pass data to parent to send to backend
    onAdd(galleryData);
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
          <h2 className="center">Add Gallery</h2>
        </header>

        <div className="container" style={{ padding: 0 }}>
          <div className="col l6 m6 s12 green center">
            <div className="src-preview-wrapper display-container">
              <img
                src={galleryData.src || ""}
                alt="preview"
                className="src-preview"
              />

              <label className="change-src-label">
                Add Image
                <input type="file" accept="src/*" onChange={handleFile} />
              </label>
            </div>
          </div>

          <div className="col l6 m6 s12 light-gray center">
            <div className="padding">
              <input
                name="label"
                placeholder="label"
                className="input margin-bottom"
                onChange={handleChange}
              />

              <textarea
                name="desc"
                placeholder="desc"
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

export default GalleryAddForm;
