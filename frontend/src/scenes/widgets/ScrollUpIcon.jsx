import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ScrollUpIcon = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div onClick={handleClick}>
      <ArrowUpwardIcon />
    </div>
  );
};

export default ScrollUpIcon;
