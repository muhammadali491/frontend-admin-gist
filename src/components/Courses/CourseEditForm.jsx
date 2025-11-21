import React from "react";

const CourseEditForm = ({ edited, setEdited, handleSave, handleCancel }) => {
  console.log(edited);
  return (
    <>
      <input
        type="text"
        value={edited.title}
        onChange={(e) => setEdited({ ...edited, title: e.target.value })}
        placeholder="Name"
      />
      <input
        type="text"
        value={edited.subtitle}
        onChange={(e) => setEdited({ ...edited, subtitle: e.target.value })}
        placeholder="subtitle"
      />
      <input
        type="text"
        value={edited.intro}
        onChange={(e) => setEdited({ ...edited, intro: e.target.value })}
        placeholder="intro"
      />
      <input
        type="text"
        value={edited.instructor}
        onChange={(e) => setEdited({ ...edited, instructor: e.target.value })}
        placeholder="instructor"
      />
      <input
        type="text"
        value={edited.duration}
        onChange={(e) => setEdited({ ...edited, duration: e.target.value })}
        placeholder="duration"
      />
      <textarea
        value={edited.description}
        onChange={(e) => setEdited({ ...edited, description: e.target.value })}
        placeholder="Description"
      />
      <div className="modal-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </>
  );
};

export default CourseEditForm;
