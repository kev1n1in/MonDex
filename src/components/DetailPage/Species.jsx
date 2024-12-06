import PropTypes from "prop-types";
import styled from "styled-components";

const Species = ({ data, isPokemon }) => {
  const description = data?.describe || data?.descriptions;

  if (!description && !data?.height && !data?.weight) {
    return null;
  }
  return (
    <Wrapper>
      {description && <Describe>{description}</Describe>}
      {isPokemon && (
        <BodyStats>
          <BodyStat>
            <Height>{data?.height} m</Height>
            <StatTitle>Height</StatTitle>
          </BodyStat>
          <BodyStat>
            <Weight>{data?.weight} kg</Weight>
            <StatTitle>Weight</StatTitle>
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
  padding: 8px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
const Describe = styled.p`
  margin: 8px 0;
  padding: 4px;
  border: 1px solid #979797;
  border-radius: 8px;
`;
const BodyStats = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BodyStat = styled.div`
  text-align: center;
  width: 45%;
`;
const Height = styled.p`
  border: 1px solid #979797;
  border-radius: 8px;
`;
const Weight = styled.p`
  border: 1px solid #979797;
  border-radius: 8px;
`;
const StatTitle = styled.span``;
export default Species;
