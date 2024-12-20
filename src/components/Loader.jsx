import PropTypes from "prop-types";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

const Loader = ({ isLoading }) =>
  isLoading ? (
    <LoaderOverlay>
      <PacmanLoader color="black" size={50} />
      <LoadingMessage>Loading...</LoadingMessage>
    </LoaderOverlay>
  ) : null;

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(254, 254, 254, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingMessage = styled.span`
  margin-top: 20px;
  font-size: 18px;
  color: black;
`;

export default Loader;
