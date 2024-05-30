import React from "react";
import PropTypes from "prop-types";
import "./RoundRate.css";

const getColorStyle = (vote) => {
  if (vote > 7) {
    return "green";
  }
  if (vote >= 5) {
    return "yellow";
  }
  if (vote >= 3) {
    return "orange";
  }
  return "red";
};

const CyrcleRate = ({ vote }) => {
  const cyrcleStyle = `cyrcle-rate_${getColorStyle(vote)} cyrcle-rate`;
  return <div className={cyrcleStyle}>{vote}</div>;
};

CyrcleRate.propTypes = {
  vote: PropTypes.number,
};

CyrcleRate.defaultProps = {
  vote: 0,
};

export default CyrcleRate;
