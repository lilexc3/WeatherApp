import React from "react";

const StatBlock = ({ label, value, unit }) => {
  return (
    <div className="stat-block">
      <span className="label">{label}</span>
      <span className="value">
        {value}
        {unit}
      </span>
    </div>
  );
};

export default StatBlock;
