import PropTypes from "prop-types";
import styled from "styled-components";
import returnImg from "./back.png";

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
        {label ? <Image src={label} alt="back" /> : "<"}
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
    label: returnImg,
    width: "36px",
    height: "36px",
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
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  background-color: #fff;
  border: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: ${(props) => props.borderRadius};
  cursor: pointer;

  @media (min-width: 768px) {
    width: ${(props) => (props.width === "36px" ? "48px" : props.width)};
    height: ${(props) => (props.height === "36px" ? "48px" : props.height)};
  }
`;
const Image = styled.img`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;

  @media (min-width: 768px) {
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
  }
`;

export default ReturnButton;
