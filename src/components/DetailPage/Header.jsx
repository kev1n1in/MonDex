import PropTypes from "prop-types";
import styled from "styled-components";
import ReturnButton from "../Buttons/ReturnButton";

const DetailHeader = ({ data, handleReturn, isDigimon }) => {
  const image = data?.image || data?.speciesDetails?.images?.[0]?.href;
  const name = data?.name || data?.speciesDetails?.name;
  const id = data?.id || data?.speciesDetails?.id;
  const levels = data?.speciesDetails?.levels || [];
  const attributes = data?.speciesDetails?.attributes || [];
  const fields = data?.speciesDetails?.fields || [];
  const types = data?.types || [];
  const formattedId = `#${id?.toString().padStart(3, "0")}`;

  return (
    <Header>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <ReturnButton onClick={handleReturn} />
      <CharacterContainer>
        <NameIdContainer>
          <Name>{name}</Name>
          <Id>{formattedId}</Id>
        </NameIdContainer>
        <Types>
          {levels.length > 0 && <Level>{levels[0]?.level}</Level>}
          {isDigimon &&
            attributes?.map((attribute, index) => (
              <Attributes key={index}>{attribute.attribute}</Attributes>
            ))}
        </Types>

        <Types>
          {types &&
            types.map((type, index) => {
              return <Type key={index}>{type?.type || type} </Type>;
            })}
        </Types>
        <Fields>
          {isDigimon &&
            fields.map((field, index) => (
              <FieldImg key={index} src={field.image} alt={field.field} />
            ))}
        </Fields>
      </CharacterContainer>
    </Header>
  );
};
DetailHeader.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    image: PropTypes.string,
    speciesDetails: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      images: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string,
        })
      ),
      levels: PropTypes.arrayOf(
        PropTypes.shape({
          level: PropTypes.string,
        })
      ),
      attributes: PropTypes.arrayOf(
        PropTypes.shape({
          attribute: PropTypes.string,
        })
      ),
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          field: PropTypes.string,
          image: PropTypes.string,
        })
      ),
    }),
    types: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ type: PropTypes.string }),
      ])
    ),
  }).isRequired,
  handleReturn: PropTypes.func.isRequired,
  isDigimon: PropTypes.bool.isRequired,
};

const Header = styled.header`
  display: flex;
  height: 120px;
  padding-left: 4px;
  margin: 12px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
const CharacterContainer = styled.div``;
const ImageContainer = styled.div`
  display: flex;
  background-color: #fff;
  width: 110px;
  height: 110px;
  margin: auto 8px auto 0;
  border-radius: 8px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const NameIdContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;

const Name = styled.h1`
  white-space: normal;
  word-wrap: break-word;
  font-size: 24px;
  max-width: 140px;
  margin: 4px 12px 4px 0;
`;
const Id = styled.p`
  font-size: 24px;
  margin: 4px 0;
  align-self: start;
`;
const Level = styled.div`
  margin: 4px 4px 4px 0;
  padding: 4px;
  border: 1px solid #979797;
  border-radius: 8px;
`;
const Attributes = styled.div`
  margin: 4px 0;
  padding: 4px;
  border: 1px solid #979797;
  border-radius: 8px;
`;
const Fields = styled.div`
  margin: 4px 0;
`;
const FieldImg = styled.img``;
const Types = styled.div`
  display: flex;
`;
const Type = styled.div`
  margin-right: 4px;
  padding: 4px;
  border: 1px solid #979797;
  border-radius: 8px;
`;
export default DetailHeader;
