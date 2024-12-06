import PropTypes from "prop-types";
import styled from "styled-components";

const Species = ({ data }) => {
  const description = data?.describe || data?.descriptions;
  const height = data?.height;
  const weight = data?.weight;
  const isDataMissing = !description && !height && !weight;

  return (
    <Wrapper>
      <Title>Description</Title>
      {isDataMissing ? (
        <Describe>Not Found</Describe>
      ) : (
        description && <Describe>{description}</Describe>
      )}

      {isDataMissing && (
        <BodyStats>
          <BodyStat>
            <Title>Height</Title>
            <Stat>{height ? `${height} m` : "Not Found"}</Stat>
          </BodyStat>
          <BodyStat>
            <Title>Weight</Title>
            <Stat>{weight ? `${weight} kg` : "Not Found"}</Stat>
          </BodyStat>
        </BodyStats>
      )}
    </Wrapper>
  );
};

Species.propTypes = {
  data: PropTypes.shape({
    describe: PropTypes.string,
    descriptions: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number,
  }).isRequired,
  isPokemon: PropTypes.bool.isRequired,
};
const Wrapper = styled.section`
  margin-top: 16px;
  padding: 8px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
const Describe = styled.p`
  margin: 8px 0;
  padding: 8px;
  background-color: ghostwhite;
  border: 1px solid #979797;
  border-radius: 8px;
  @media (min-width: 480px) {
    font-size: 24px;
  }
`;
const BodyStats = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BodyStat = styled.div`
  text-align: center;
  width: 45%;
`;
const Stat = styled.p`
  padding: 4px 0;
  background-color: ghostwhite;
  border: 1px solid #979797;
  border-radius: 8px;
  @media (min-width: 480px) {
    font-size: 24px;
  }
`;

const Title = styled.p`
  margin: 4px 0;
  width: 100%;
  text-align: center;
  color: gray;
`;
export default Species;
