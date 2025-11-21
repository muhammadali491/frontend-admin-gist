import React from "react";

const FacultyCard = ({ facultyMember, onClick }) => {
  return (
    <div className="faculty-card" onClick={() => onClick(facultyMember)}>
      <img src={facultyMember.imgSrc} alt={facultyMember.name} />
      <h4>{facultyMember.name}</h4>
      <p>{facultyMember.position}</p>
    </div>
  );
};

export default FacultyCard;
