import { CiLocationOn } from "react-icons/ci";
import { FaSignal } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import CamerasData from "./CamerasData";
import "./Camera.css";
import { useState } from "react";

const Cameras = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [locations, setLocations] = useState([]);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div>
      <div className="Header">
        <div className="Header_cam">
          <h3>Cameras</h3>
          <p>Manage Your Cameras Here</p>
        </div>
        <div className="Search-Container">
          <CiSearch className="Search-icon" />
          <input
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchTerm}
            className="Search-input"
          />
        </div>
      </div>
      <div className="Header_next">
        <div>
          <CiLocationOn className="location-icon" />
          <select
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="" disabled>
              Location
            </option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FaSignal />
          <select
            id="status"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="" disabled>
              Status
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <CamerasData
        searchTerm={searchTerm}
        selectedLocation={selectedLocation}
        selectedStatus={selectedStatus}
        setLocations={setLocations}
      />
    </div>
  );
};

export default Cameras;
