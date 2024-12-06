import PropTypes from "prop-types";
import styled from "styled-components";
import mochimonImg from "./mochimon.png";
import psyduckImg from "./psyduck.png";

const NoDataContainer = ({ isPokemon }) => {
  return (
    <Wrapper>
      <Image src={isPokemon ? psyduckImg : mochimonImg} />
      <Message>No results found</Message>
    </Wrapper>
  );
};

NoDataContainer.propTypes = {
  isPokemon: PropTypes.bool.isRequired,
  isDigimon: PropTypes.bool.isRequired,
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;
const Message = styled.div`
  text-align: center;
  font-size: 36px;
  @media (min-width: 480px) {
    font-size: 48px;
  }
`;
const Image = styled.img`
  margin: 0 auto;
  max-width: 276px;
  max-height: 359px;
`;
export default NoDataContainer;
