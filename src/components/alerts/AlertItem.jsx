import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";

const AlertItem = ({ alert }) => {
  const [falseAlarm, setFalseAlarm] = useState(alert.falseAlarm);

  const toggleFalseAlarm = async () => {
    const updatedStatus = !falseAlarm;
    setFalseAlarm(updatedStatus);
    try {
      await axios.patch(`http://localhost:8000/alerts/${alert.id}`, { falseAlarm: updatedStatus });
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div>
        <p className="font-bold text-lg">{alert.alert_type}</p>
        <p className="text-gray-500">• {dayjs(alert.timestamp).format("D MMMM YYYY, HH:mm")}</p>
        <p className="text-gray-700">
          <strong>Driver:</strong> {alert.driver_friendly_name} / {alert.vehicle_friendly_name}
        </p>
      </div>
      <button className="flex items-center text-gray-600 border px-4 py-2 rounded" onClick={toggleFalseAlarm}>
        {falseAlarm ? "Mark As Valid Alarm" : "Mark As False Alarm"}
      </button>
    </div>
  );
};

export default AlertItem;
