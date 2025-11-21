import React from "react";

const CourseViewForm = ({ handleDelete, selected, onEdit }) => (
  <>
    <h3>{selected.name}</h3>
    <p>
      <strong>Title:</strong> {selected.title}
    </p>
    <p>
      <strong>Subtitle:</strong> {selected.subtitle}
    </p>
    <p>
      <strong>Intro :</strong> {selected.intro}
    </p>
    <p>
      <strong>Instructor:</strong> {selected.instructor}
    </p>
    <p>
      <strong>Duration :</strong> {selected.duration}
    </p>
    <p>
      <strong>Description :</strong> {selected.description}
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
      Delte
    </button>
  </>
);

export default CourseViewForm;
