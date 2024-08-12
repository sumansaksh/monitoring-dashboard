import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { IoBarbell, IoNotifications, IoNotificationsOff } from "react-icons/io5";

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
    <div className="p-4 border-b flex justify-between items-center max-sm:flex-col max-sm:items-center">
      <div className="w-full">
        <p className="font-bold text-lg">{alert.alert_type}</p>
        <p className="text-gray-500">• {dayjs(alert.timestamp).format("D MMMM YYYY, HH:mm")}</p>
        <p className="text-gray-700">
          <strong>Driver:</strong> {alert.driver_friendly_name} / {alert.vehicle_friendly_name}
        </p>
      </div>
      <div className="w-full flex justify-end">
        <button className={`flex items-center border px-4 py-2  rounded ${falseAlarm ? "text-red-600" : "text-green-600"}`} onClick={toggleFalseAlarm}>
          {falseAlarm ? <IoNotificationsOff className="mr-2" /> : <IoNotifications className="mr-2" />}
          {falseAlarm ? "Mark As Valid Alarm" : "Mark As False Alarm"}
        </button>
      </div>
    </div>
  );
};

export default AlertItem;
