import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ScrollDownIcon = () => {
  const handleClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div onClick={handleClick}>
      <ArrowDownwardIcon />
    </div>
  );
};

export default ScrollDownIcon;
