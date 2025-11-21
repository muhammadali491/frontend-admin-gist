import React from "react";
import "./OurGallery.css";

const GalleryItem = ({ image, onClick }) => {
  return (
    <div
      className="card hover-shadow"
      // onClick={onClick}
      onClick={() => onClick(image)}
      style={{ cursor: "pointer", borderRadius: "12px", overflow: "hidden" }}
    >
      <img
        src={image.src}
        alt={image.label}
        className="image"
        style={{ height: "200px", objectFit: "cover", width: "100%" }}
      />
      <div className="center padding">{image.label}</div>
    </div>
  );
};

export default GalleryItem;
