import PropTypes from "prop-types";
import styled from "styled-components";

const Evolution = ({ data, isPokemon }) => {
  const evolutionChain = data?.evolutionChain || [];

  if (!isPokemon || !data?.evolutionChain?.length) return null;

  return (
    <>
      <Title>Evolution</Title>
      <EvolutionChain>
        {evolutionChain.map((evolution, index) => (
          <EvolutionCardContainer key={index}>
            <EvolutionCard>
              <Image src={evolution.image} alt={evolution.name} />
              <EvolutionName>{evolution.name}</EvolutionName>
            </EvolutionCard>
            {evolutionChain[index + 1] && <Arrow>{">"}</Arrow>}
          </EvolutionCardContainer>
        ))}
      </EvolutionChain>
    </>
  );
};
Evolution.propTypes = {
  data: PropTypes.shape({
    baseStats: PropTypes.object,
    evolutionChain: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isPokemon: PropTypes.bool.isRequired,
};

const EvolutionChain = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin: 8px 0;
`;
const EvolutionCardContainer = styled.div`
  display: flex;
  align-items: center;
`;
const EvolutionName = styled.p``;
const EvolutionCard = styled.div``;
const Arrow = styled.div``;
const Image = styled.img`
  width: 84px;
  height: 84px;
`;
export default Evolution;
