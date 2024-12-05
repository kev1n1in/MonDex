import PropTypes from "prop-types";
import styled from "styled-components";

const Evolution = ({ data, isPokemon }) => {
  return (
    <>
      {isPokemon && data?.baseStats && (
        <>
          <Title>Evolution</Title>
          <EvolutionChain>
            {data?.evolutionChain &&
              data?.evolutionChain?.map((evolution, index) => {
                const nextEvolution = data.evolutionChain[index + 1];
                return (
                  <EvolutionCardContainer key={index}>
                    <EvolutionCard>
                      <Image src={evolution.image}></Image>
                      <EvolutionName>{evolution.name}</EvolutionName>
                    </EvolutionCard>
                    {nextEvolution && <Arrow>{">"}</Arrow>}
                  </EvolutionCardContainer>
                );
              })}
          </EvolutionChain>
        </>
      )}
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
