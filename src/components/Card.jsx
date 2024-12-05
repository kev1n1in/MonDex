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
  width: 160px;
  height: 220px;
  margin: 4px;
  background-color: #f2f2f2;
  border-radius: 8px;
`;

const Name = styled.h2`
  padding-top: 12px;
  height: 50px;
  width: 100%;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ImageContainer = styled.div`
  background-color: #fff;
`;
const Image = styled.img`
  width: 140px;
  height: 140px;
`;
const Types = styled.div`
  display: flex;
`;

const Type = styled.p`
  padding: 8px;
  margin: 4px;
  border-radius: 12px;
  font-size: 10px;
  border: 1px solid #7e7e7e;
`;

export default Card;
