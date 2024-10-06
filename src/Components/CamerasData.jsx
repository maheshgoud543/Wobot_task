import axios from "axios";
import { useEffect, useState } from "react";
import "./CamerasData.css";
import { AiOutlineStop } from "react-icons/ai";
import { LuArrowRightCircle } from "react-icons/lu";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { CiCloudOn } from "react-icons/ci";
import { FaRegRectangleList } from "react-icons/fa6";

const CamerasData = ({
  searchTerm,
  selectedLocation,
  selectedStatus,
  setLocations,
}) => {
  const [cameraData, setCameraData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [selectedCameras, setSelectedCameras] = useState([]);

  useEffect(() => {
    const headers = { Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy" };

    axios
      .get("https://api-app-staging.wobot.ai/app/v1/fetch/cameras", { headers })
      .then((response) => {
        const data = response.data.data;
        setCameraData(data);
        const uniqueLocations = [
          ...new Set(data.map((camera) => camera.location)),
        ];
        setLocations(uniqueLocations);
      })
      .catch((error) => console.error("Error fetching camera data:", error));
  }, []);

  const filteredData = cameraData.filter((camera) => {
    const matchesSearchTerm = camera.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    const matchesLocation = selectedLocation
      ? camera.location === selectedLocation
      : true;
    const matchesStatus = selectedStatus
      ? camera.status === selectedStatus
      : true;

    return matchesSearchTerm && matchesLocation && matchesStatus;
  });

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  const npages = Math.ceil(filteredData.length / recordsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < npages) setCurrentPage(currentPage + 1);
  };

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const handleCheckBox = (camId) => {
    setSelectedCameras((prev) =>
      prev.includes(camId)
        ? prev.filter((id) => id !== camId)
        : [...prev, camId]
    );
  };
  const handleDeleteSelected = () => {
    setCameraData((prevData) =>
      prevData.filter((cam) => !selectedCameras.includes(camera.id))
    );
    setSelectedCameras([]);
  };

  return (
    <div>
      {cameraData && cameraData.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th><input type="checkbox"/>NAME</th>
                <th>HEALTH </th>
                <th>LOCATION</th>
                <th>RECORDER</th>
                <th>TASKS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {records.map((camera) => (
                <tr key={camera._id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckBox(camera.id)}
                    />
                    {camera.name}
                  </td>
                  <td>
                    <CiCloudOn /> {camera.health.cloud}
                    <FaRegRectangleList /> {camera.health.device}
                  </td>
                  <td>{camera.location}</td>
                  <td>{camera.recorder ? camera.recorder : "N/A"}</td>
                  <td>{camera.tasks}</td>
                  <td
                    className={
                      camera.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {camera.status}
                  </td>
                  <td>
                    {camera.status == "Active" ? (
                      <AiOutlineStop />
                    ) : (
                      <LuArrowRightCircle />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading data...</p>
      )}

      <nav>
        <div className="records-per-page">
          {/* <label htmlFor="recordsPerPage"> </label> */}
          <select
            id="recordsPerPage"
            value={recordsPerPage}
            onChange={handleRecordsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <ul className="Page-item">
          <li className="Page-item">
            <a href="#" className="Page-link" onClick={handlePrevPage}>
              <MdOutlineKeyboardDoubleArrowLeft />
            </a>
            <a href="#" className="Page-link" onClick={handleNextPage}>
              <MdOutlineKeyboardDoubleArrowRight />
            </a>
          </li>
        </ul>
      </nav>
      {selectedCameras.length > 0 && (
        <button onClick={handleDeleteSelected}>Delete Selected</button>
      )}
    </div>
  );
};

export default CamerasData;
