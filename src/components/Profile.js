import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import AdminImage from "../Admin.jpeg";
import profileData from "./profileData.json";
import "./profile.css";
export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(profileData);

  const handleClick = () => {
    navigate("/");
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    setFormData(profileData);
  }, []);

  return (
    <div className="profile-container">
      <div className="imagepro">
        <img className="profileImage" src={AdminImage} alt="Profile" />
      </div>

      <div className="details">
        <form>
          <label>
            Name :
            <input
              className="form-field"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled
            />
          </label>
          <label>
            Email :
            <input
              className="form-field"
              type="text"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled
            />
          </label>
          <label>
            UUID :
            <input
              className="form-field"
              type="text"
              value={formData.UUID}
              onChange={(e) => handleInputChange("UUID", e.target.value)}
              disabled
            />
          </label>
        </form>
      </div>
      <button className="Exit buttonpro" onClick={handleClick}>
        Return
      </button>
    </div>
  );
}
