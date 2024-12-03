import PropTypes from "prop-types";
import styled from "styled-components";

const Card = ({ name, imageUrl, types }) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Image src={imageUrl} alt={name} />
      {types && <Types>{types.join(" , ")}</Types>}
    </Wrapper>
  );
};
Card.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
`;

const Name = styled.h2``;
const Image = styled.img`
  width: 96px;
  height: 96px;
`;
const Types = styled.p``;

export default Card;
