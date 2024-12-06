import PropTypes from "prop-types";
import styled from "styled-components";

const ReturnButton = ({ onClick, options }) => {
  const { right, top, label, width, height, position, fontSize, borderRadius } =
    options;

  return (
    <Wrapper right={right} top={top} onClick={onClick} position={position}>
      <Button
        width={width}
        height={height}
        borderRadius={borderRadius}
        fontSize={fontSize}
      >
        {label || "<"}
      </Button>
    </Wrapper>
  );
};

ReturnButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  options: PropTypes.shape({
    right: PropTypes.string,
    top: PropTypes.string,
    label: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string,
    position: PropTypes.string,
    fontSize: PropTypes.string,
  }).isRequired,
};
ReturnButton.defaultProps = {
  options: {
    position: "fixed",
    right: "12px",
    top: "12px",
    label: "<",
    width: "24px",
    height: "24px",
    fontSize: "16px",
    borderRadius: "50%",
  },
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: ${(props) => props.position};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
`;
const Button = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  border-radius: ${(props) => props.borderRadius};
  cursor: pointer;
`;

export default ReturnButton;
