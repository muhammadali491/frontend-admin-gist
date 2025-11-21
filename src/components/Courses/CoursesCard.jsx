import React from "react";

const CourseCard = ({ course, index, onClick }) => {
  return (
    <div className="course-card" key={index}>
      <div className="course-image-wrapper">
        <img src={course.image} alt={course.title} className="course-image" />
        <div className="overlay-info">
          <h3>{course.title}</h3>
          <p>By {course.instructor}</p>
        </div>
      </div>
      <div className="course-content">
        <h4>{course.subtitle}</h4>
        <p>{course.intro}</p>
      </div>
      <div className="course-footer">
        <span className="course-duration">{course.duration}</span>
        <button className="enroll-btn" onClick={() => onClick(course)}>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
