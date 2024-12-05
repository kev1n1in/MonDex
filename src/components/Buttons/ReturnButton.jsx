import PropTypes from "prop-types";
import styled from "styled-components";

const ReturnButton = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <Button>{"<"}</Button>
    </Wrapper>
  );
};

ReturnButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  position: fixed;
  right: 12px;
  top: 12px;
`;
const Button = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export default ReturnButton;
