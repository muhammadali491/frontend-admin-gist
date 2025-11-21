import React, { useEffect, useState } from "react";
import "./Loading.css"; // Don't forget to create this CSS file

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 1;
        return next >= 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <h1 className="loading-title">Loading...</h1>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-text">{progress}%</p>
    </div>
  );
};

export default Loading;
