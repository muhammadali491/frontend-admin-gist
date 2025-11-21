import React from "react";

const FacultyView = ({ selected, onEdit, handleDelete }) => (
  <>
    <h3>{selected.name}</h3>
    <p>
      <strong>Position:</strong> {selected.position}
    </p>
    <p>
      <strong>Qualification:</strong> {selected.qualification}
    </p>
    <p>
      <strong>Experience:</strong> {selected.experience}
    </p>
    <p>
      <strong>About:</strong> {selected.description}
    </p>
    <button className="button blue" onClick={onEdit}>
      Edit
    </button>
    <button className="button red" onClick={() => handleDelete(selected._id)}>
      Delete
    </button>
  </>
);

export default FacultyView;
