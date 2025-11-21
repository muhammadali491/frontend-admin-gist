import React from "react";

const ImageEditForm = ({ edited, setEdited, handleSave, handleCancel }) => {
  return (
    <>
      <input
        type="text"
        value={edited.label}
        onChange={(e) => setEdited({ ...edited, label: e.target.value })}
        placeholder="label"
      />

      <textarea
        value={edited.desc}
        onChange={(e) => setEdited({ ...edited, desc: e.target.value })}
        placeholder="desc"
      />
      <div className="modal-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </>
  );
};

export default ImageEditForm;
