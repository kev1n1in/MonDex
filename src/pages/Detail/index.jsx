import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BaseStats from "../../components/BaseStatsChart";
import ReturnButton from "../../components/Buttons/ReturnButton";
import { getDigimon } from "../../services/digimonService";
import { getPokemon } from "../../services/pokemonService";

const Detail = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isPokemon = location.pathname.includes("pokemon");
  const isDigimon = location.pathname.includes("digimon");
  const { name } = useParams();

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: isLoadingPokemon,
  } = useQuery({
    queryKey: ["pokemon", location.pathname],
    queryFn: () => getPokemon(name),
    enabled: isPokemon,
  });
  const {
    data: digimonData,
    error: digimonError,
    isLoading: isLoadingDigimon,
  } = useQuery({
    queryKey: ["digimon", location.pathname],
    queryFn: () => getDigimon(name),
    enabled: isDigimon,
  });

  useEffect(() => {
    if (isPokemon && pokemonData) {
      setData(pokemonData);
    } else if (isDigimon && digimonData) {
      setData(digimonData);
    }
  }, [isPokemon, isDigimon, pokemonData, digimonData]);
  console.log(data);

  const handleReturn = () => {
    if (isPokemon) {
      navigate("/pokemon");
    } else if (isDigimon) {
      navigate("/digimon");
    }
  };
  if (isLoadingPokemon || isLoadingDigimon) return <div>Loading...</div>;
  if (pokemonError)
    return <div>Error loading Pokemon: {pokemonError.message}</div>;
  if (digimonError)
    return <div>Error loading Digimon: {digimonError.message}</div>;

  return (
    <Wrapper>
      <Header>
        <ImageContainer>
          <Image src={data?.image || data?.speciesDetails.images[0].href} />
        </ImageContainer>

        <ReturnButton onClick={handleReturn} />
        <CharacterContainer>
          <NameIdContainer>
            <Name>{data?.name || data?.speciesDetails.name}</Name>
            <Id>ID:{data?.id || data?.speciesDetails.id}</Id>
          </NameIdContainer>
          {isDigimon && <Level>{data?.speciesDetails?.levels[0]?.level}</Level>}
          {isDigimon &&
            data?.speciesDetails.attributes?.map((attribute, index) => (
              <Attributes key={index}>{attribute.attribute}</Attributes>
            ))}

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
      <Main>
        <Species>
          <Describe>{data?.describe || data?.descriptions}</Describe>
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
        </Species>

        {isPokemon && (
          <>
            <Title>Abilities</Title>
            <Abilities>
              {data?.abilities?.map((ability, index) => (
                <Ability key={index}>{ability}</Ability>
              ))}
            </Abilities>
          </>
        )}
        {isDigimon && (
          <>
            <Title>Skills</Title>
            <Abilities>
              {data?.speciesDetails?.skills.slice(0, 3).map((skill, index) => (
                <Ability key={index}>{skill.skill}</Ability>
              ))}
            </Abilities>
          </>
        )}
        {isPokemon && data?.baseStats && (
          <BaseStats baseStats={data.baseStats} />
        )}

        {isPokemon && data?.baseStats && (
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
        )}
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

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
  font-size: 30px;
  margin: 4px 12px 4px 0;
`;

const Id = styled.p`
  margin: 4px 0;
  align-self: end;
`;
const Level = styled.p`
  margin: 4px 0;
`;
const Attributes = styled.div`
  margin: 4px 0;
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
`;

const Main = styled.main`
  margin: 12px 12px;
`;

const Species = styled.section`
  padding: 8px;
  background-color: #f2f2f2;
  border-radius: 8px;
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
const Abilities = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 8px 0;
  padding: 8px 0;
  background-color: #f2f2f2;
  border-radius: 8px;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 24px;
`;
const Ability = styled.div`
  padding: 8px;
  font-size: 18px;
  border: 1px solid #979797;
  border-radius: 8px;
`;
const StatTitle = styled.span``;
const EvolutionChain = styled.div`
  display: flex;
  justify-content: space-around;
`;
const EvolutionCardContainer = styled.div`
  display: flex;
  align-items: center;
`;
const EvolutionName = styled.p``;
const EvolutionCard = styled.div``;
const Arrow = styled.div``;
export default Detail;
