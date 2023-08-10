import styled, { css, keyframes } from "styled-components";

const StyledButton = styled.button`
  position: absolute;
  width: 0.8vw;
  height: 0.8vw;
  background-color: ${(props) =>
    props.isActive ? "rgb(32, 217, 246)" : "white"};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  &:hover {
    background-color:  rgba(32, 217, 246, 0.7);
  }

  ${(props) => {
    const color = props.isActive
      ? "rgba(32, 217, 246, 0.7)"
      : "rgba(255, 255, 255, 0.7)";
    const color2 = props.isActive
      ? "rgba(32, 217, 246, 0)"
      : "rgba(255, 255, 255, 0)";

    const pulse = keyframes`
      0% {
        transform: scale(2);
        box-shadow: 0 0 0 0 ${color};
      }
      70% {
        transform: scale(2);
        box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
      }
      100% {
        transform: scale(2);
        box-shadow: 0 0 0 0 ${color2};
      }
    `;

    return props.isPulsating
      ? css`
          animation: ${pulse} 1.5s infinite;
        `
      : "none";
  }};
`;

export default StyledButton;
