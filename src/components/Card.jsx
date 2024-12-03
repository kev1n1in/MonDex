import PropTypes from "prop-types";
import styled from "styled-components";

const Card = ({ name, imageUrl, types }) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <ImageContainer>
        <Image src={imageUrl} alt={name} />
      </ImageContainer>

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
  width: 150px;
  height: 200px;
  margin: 12px;
  background-color: #f2f2f2;
`;

const Name = styled.h2`
  padding-top: 12px;
  height: 50px;
`;
const ImageContainer = styled.div`
  background-color: #fff;
`;
const Image = styled.img`
  width: 96px;
  height: 96px;
`;
const Types = styled.p``;

export default Card;
