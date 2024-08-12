import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertList from "../../components/alerts/index";
import SearchBar from "../../components/alerts/Filter";

const HomePage = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/alerts");
      setAlerts(result.data);
      setFilteredAlerts(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = alerts;

    if (searchText) {
      filtered = filtered.filter((alert) => Object.values(alert).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase())));
    }

    if (vehicleNumber) {
      filtered = filtered.filter((alert) => alert.vehicle_friendly_name.toLowerCase().includes(vehicleNumber.toLowerCase()));
    }

    if (startDate && endDate) {
      filtered = filtered.filter((alert) => {
        const alertDate = new Date(alert.timestamp);
        return alertDate >= new Date(startDate) && alertDate <= new Date(endDate);
      });
    }

    setFilteredAlerts(filtered);
  }, [searchText, vehicleNumber, startDate, endDate, alerts]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Driver Monitoring Alerts</h1>
      <SearchBar setSearchText={setSearchText} setVehicleNumber={setVehicleNumber} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />
      <AlertList alerts={filteredAlerts} />
    </div>
  );
};

export default HomePage;
