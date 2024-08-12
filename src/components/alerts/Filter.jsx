import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const SearchBar = ({ setSearchText, setVehicleNumber, setStartDate, setEndDate, startDate, endDate }) => {
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
    <div className="flex items-center space-x-4 mb-4 max-sm:flex-col max-sm:gap-4">
      <input type="text" placeholder="Search" className="p-2 border rounded w-full h-[50px]" onChange={(e) => setSearchText(e.target.value)} />
      <div className="w-full">
        <Select options={vehicleOptions} placeholder="Vehicle #" className="text-base" onChange={(selectedOption) => setVehicleNumber(selectedOption.label)} styles={{ control: (base) => ({ ...base, height: "50px" }) }} />
      </div>
      <div className="flex space-x-4 w-full">
        <label className="flex items-center space-x-2">
          <span className="font-bold">Date Range:</span>
          <input
            type="date"
            className="p-2 border rounded h-[50px]"
            value={startDate}
            onChange={(e) => {
              const newStartDate = e.target.value;

              setStartDate(newStartDate);
            }}
          />
          <span className="mx-1">to</span>
          <input
            type="date"
            className="p-2 border rounded h-[50px]"
            value={endDate}
            onChange={(e) => {
              const newEndDate = e.target.value;

              setEndDate(newEndDate);
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
