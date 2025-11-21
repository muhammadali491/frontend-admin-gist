import React from "react";

const FacultyEditForm = ({ edited, setEdited, handleSave, handleCancel }) => {
  return (
    <>
      <input
        type="text"
        value={edited.name}
        onChange={(e) => setEdited({ ...edited, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="text"
        value={edited.position}
        onChange={(e) => setEdited({ ...edited, position: e.target.value })}
        placeholder="Position"
      />
      <input
        type="text"
        value={edited.qualification}
        onChange={(e) =>
          setEdited({ ...edited, qualification: e.target.value })
        }
        placeholder="Qualification"
      />
      <input
        type="text"
        value={edited.experience}
        onChange={(e) => setEdited({ ...edited, experience: e.target.value })}
        placeholder="Experience"
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

export default FacultyEditForm;
