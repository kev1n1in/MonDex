import PropTypes from "prop-types";
import styled from "styled-components";

const Evolution = ({ data }) => {
  const evolutionChain = data?.evolutionChain || [];

  return (
    <>
      <Title>Evolution</Title>
      <EvolutionChain>
        {evolutionChain.length > 0 ? (
          evolutionChain.map((evolution, index) => (
            <EvolutionCardContainer key={index}>
              <EvolutionCard>
                <Image
                  src={evolution.image}
                  alt={evolution.name}
                  loading="lazy"
                />
                <EvolutionName>{evolution.name}</EvolutionName>
              </EvolutionCard>
              {evolutionChain[index + 1] && <Arrow>{">"}</Arrow>}
            </EvolutionCardContainer>
          ))
        ) : (
          <Result>Not Found</Result>
        )}
      </EvolutionChain>
    </>
  );
};

Evolution.propTypes = {
  data: PropTypes.shape({
    evolutionChain: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
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

const EvolutionName = styled.p`
  margin-bottom: 8px;
  text-align: center;
`;

const EvolutionCard = styled.div``;

const Arrow = styled.div``;

const Image = styled.img`
  width: 84px;
  height: 84px;
`;

const Result = styled.div`
  width: 100%;
  margin: 8px;
  padding: 8px;
  background-color: ghostwhite;
  border: 1px solid #979797;
  border-radius: 8px;
  @media (min-width: 480px) {
    font-size: 24px;
  }
`;

export default Evolution;
