import React from 'react';
import AlertItem from './AlertItem';

const AlertList = ({ alerts }) => {
  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </div>
  );
};

export default AlertList;