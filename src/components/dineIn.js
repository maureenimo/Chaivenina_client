// Import useState
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { Link } from "react-router-dom";

const DineIn = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="dine-in-section">
      <div className="video-card">
        <iframe
          title="Restaurant Video"
          width="580"
          height="315"
          src={videoLoaded ? "https://player.vimeo.com/external/173249177.sd.mp4?s=4b45afd27c8a454&oauth2_token_id=57447761" : ""}
          style={{ display: videoLoaded ? "block" : "none" }}
          onLoad={() => setVideoLoaded(true)}
          allowFullScreen
        ></iframe>
      </div>
      <div className="dine-in-description">
        <FontAwesomeIcon icon={faUtensils} className="utensils" />
        <h2>DINE IN</h2>
        <p style={{ color: "black" }}>
          Savor the essence of culinary bliss in our cozy ambiance. Join us for
          an unforgettable DINE IN experience!
        </p>
        <Link to="/dine-in">
          <button className="reservation-button">Book a reservation</button>
        </Link>
      </div>
    </div>
  );
};

export default DineIn;

