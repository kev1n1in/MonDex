import PropTypes from "prop-types";
import styled from "styled-components";

const Card = ({ name, imageUrl, types, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <Name>{name}</Name>
      <ImageContainer>
        <Image src={imageUrl} alt={name} />
      </ImageContainer>
      <Types>
        {types && types.length > 0 ? (
          types.map((type, index) => <Type key={index}>{type}</Type>)
        ) : (
          <Type>??</Type>
        )}
      </Types>
    </Wrapper>
  );
};
Card.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  margin: 8px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.3);
  }
`;

const Name = styled.h2`
  padding-top: 12px;
  height: 50px;
  width: 155px;
  font-weight: 700;
  text-align: center;
  line-height: 35px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (min-width: 480px) {
    width: 210px;
    font-size: 30px;
  }
  @media (min-width: 768px) {
    width: 230px;
  }
  @media (min-width: 1280px) {
    width: 300px;
  }
`;
const ImageContainer = styled.div`
  width: 90%;
  height: 140px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    height: 200px;
  }
  @media (min-width: 1000px) {
    height: 280px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const Types = styled.div`
  display: flex;
  margin: 4px 0;
`;

const Type = styled.p`
  padding: 8px;
  margin: 4px;
  border-radius: 12px;
  font-size: 10px;
  border: 1px solid #7e7e7e;
  @media (min-width: 480px) {
    font-size: 12px;
  }
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 1280px) {
    font-size: 20px;
  }
`;

export default Card;
