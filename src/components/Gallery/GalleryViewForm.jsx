import React from "react";

const ImageViewForm = ({ handleDelete, selected, onEdit }) => (
  <>
    <h3>{selected.label}</h3>
    <p>
      <strong>label:</strong> {selected.label}
    </p>
    <p>
      <strong>desc:</strong> {selected.desc}
    </p>

    <button className="button blue" onClick={onEdit}>
      Edit
    </button>
    <button
      className="button red"
      onClick={() => {
        handleDelete(selected._id);
      }}
    >
      Delete
    </button>
  </>
);

export default ImageViewForm;
