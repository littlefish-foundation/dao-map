import React from "react";
import StyledButton from "./StyledButton";

const InteractiveObject = ({
  left,
  top,
  scale,
  handleClick,
  name,
  isPulsating,
  isActive,
  color,
}) => {
  const buttonStyle = {
    left: `${left}%`,
    top: `${top}%`,
    scale: `${scale}`,
    // backgroundColor: `${color}`,
  };

  const textStyle = {
    color: isActive ? "rgb(32, 217, 246)" : "white",

    font: "Lomo Std Copy Medium",
    fontSize: "1.5vw",
    fontWeight: "bold",
    position: "absolute",
    top: `${top - 5}%`,
    left: `${left}%`,
    transform: "translateX(-50%)",
  };

  return (
    <>
      <div style={textStyle}>{name}</div>
      <StyledButton
        style={buttonStyle}
        onClick={handleClick}
        isPulsating={isPulsating}
        isActive={isActive}
      />
    </>
  );
};

export default InteractiveObject;
