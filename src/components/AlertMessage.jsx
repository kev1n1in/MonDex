import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const AlertMessage = ({ message }) => {
  if (!message) return null;
  return <AlertContainer>{message}</AlertContainer>;
};

const slideIn = keyframes`
  0% {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f44848;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  font-size: 16px;
  font-weight: bold;
  animation: ${slideIn} 0.5s ease-out;
`;
AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
export default AlertMessage;
