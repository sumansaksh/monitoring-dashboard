import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const SearchBar = ({ setSearchText, setVehicleNumber, setStartDate, setEndDate }) => {
  const [vehicleOptions, setVehicleOptions] = useState([]);

  useEffect(() => {
    const fetchVehicleOptions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/vehicles");
        const options = response.data.map((vehicle) => ({
          value: vehicle.id, // Assuming the backend returns an array of objects with a 'name' property
          label: vehicle.friendly_name,
        }));
        setVehicleOptions(options);
      } catch (error) {
        console.error("Failed to fetch vehicle options:", error);
      }
    };

    fetchVehicleOptions();
  }, []);

  return (
    <div className="flex items-center space-x-4 mb-4">
      <input type="text" placeholder="Search" className="p-2 border rounded w-1/4" onChange={(e) => setSearchText(e.target.value)} />
      <div className="relative w-1/4">
        <Select options={vehicleOptions} placeholder="Vehicle #" className="text-base" onChange={(selectedOption) => setVehicleNumber(selectedOption.label)} />
      </div>
      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <span className="font-bold">Date Range:</span>
          <input type="date" className="p-2 border rounded" onChange={(e) => setStartDate(e.target.value)} />
          <span className="mx-1">to</span>
          <input type="date" className="p-2 border rounded" onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
