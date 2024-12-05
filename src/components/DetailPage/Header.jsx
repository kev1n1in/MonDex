import PropTypes from "prop-types";
import styled from "styled-components";
import ReturnButton from "../Buttons/ReturnButton";

const DetailHeader = ({ data, handleReturn, isDigimon }) => {
  return (
    <Header>
      <ImageContainer>
        <Image src={data?.image || data?.speciesDetails?.images[0].href} />
      </ImageContainer>
      <ReturnButton onClick={handleReturn} />
      <CharacterContainer>
        <NameIdContainer>
          <Name>{data?.name || data?.speciesDetails?.name}</Name>
          <Id>ID:{data?.id || data?.speciesDetails?.id}</Id>
        </NameIdContainer>
        <Types>
          {data?.speciesDetails?.levels?.length > 0 && (
            <Level>{data?.speciesDetails?.levels[0]?.level}</Level>
          )}
          {isDigimon &&
            data?.speciesDetails.attributes?.map((attribute, index) => (
              <Attributes key={index}>{attribute.attribute}</Attributes>
            ))}
        </Types>

        <Types>
          {data?.types &&
            data?.types.map((type, index) => {
              return <Type key={index}>{type?.type || type} </Type>;
            })}
        </Types>
        <Fields>
          {isDigimon &&
            data?.speciesDetails.fields.map((field, index) => (
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
  height: auto;
  padding-left: 4px;
  margin: 12px;
  background-color: #f2f2f2;
  border-radius: 8px;
`;
const CharacterContainer = styled.div``;
const ImageContainer = styled.div`
  display: flex;
  background-color: #fff;
  width: 84px;
  height: 84px;
  margin: auto 8px auto 0;
  border-radius: 8px;
`;
const Image = styled.img`
  width: 84px;
  height: 84px;
`;
const NameIdContainer = styled.div`
  display: flex;
`;

const Name = styled.h1`
  font-size: 24px;
  margin: 4px 12px 4px 0;
`;
const Id = styled.p`
  font-size: 20px;
  margin: 4px 0;
  align-self: end;
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
