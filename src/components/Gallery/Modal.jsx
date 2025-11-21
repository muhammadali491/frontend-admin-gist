import React, { useEffect } from "react";
import "./OurGallery.css";
const Modal = ({ imgSrc, desc, isOpen, closeModal }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="modal"
      onClick={(e) => e.target.className === "modal" && closeModal()}
    >
      <div className="modal-content animate-zoom custom-modal">
        <span className="close-btn" onClick={closeModal}>
          &times;
        </span>
        <img src={imgSrc} alt="Preview" className="modal-image" />
        <div className="modal-text">{desc}</div>
      </div>
    </div>
  );
};

export default Modal;
