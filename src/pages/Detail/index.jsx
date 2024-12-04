import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getDigimon } from "../../services/digimonService";
import { getPokemon } from "../../services/pokemonService";

const Detail = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
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

  if (isLoadingPokemon || isLoadingDigimon) return <div>Loading...</div>;
  if (pokemonError)
    return <div>Error loading Pokemon: {pokemonError.message}</div>;
  if (digimonError)
    return <div>Error loading Digimon: {digimonError.message}</div>;

  return (
    <Wrapper>
      <Header>
        <CharacterContainer>
          <NameIdContainer>
            <Name>{data?.name}</Name>
            <Id>{data?.id}</Id>
          </NameIdContainer>
          <Types>
            {data?.types &&
              data?.types.map((type, index) => {
                return <Type key={index}>{type}</Type>;
              })}
          </Types>
        </CharacterContainer>
        <Image src={data?.image} />
      </Header>
      <Main>
        <Species>
          <Describe>{data?.describe}</Describe>
          <Height>{data?.height} m</Height>
          <Weight>{data?.weight} kg</Weight>
        </Species>
        <Abilities>
          <Ability>
            {data?.abilities &&
              data?.abilities?.map((ability, index) => {
                return <Ability key={index}>{ability}</Ability>;
              })}
          </Ability>
        </Abilities>
        <BaseStats>
          {data?.baseStats &&
            Object.entries(data.baseStats).map(([stat, value], index) => {
              return (
                <Stat key={index}>
                  <StatTitle>{stat}:</StatTitle> <StatValue>{value}</StatValue>
                </Stat>
              );
            })}
        </BaseStats>
        <EvolutionChain>
          {data?.evolutionChain &&
            data?.evolutionChain?.map((evolution, index) => {
              return (
                <EvolutionCard key={index}>
                  <Image src={evolution.image}></Image>
                  <Name>{evolution.name}</Name>
                </EvolutionCard>
              );
            })}
        </EvolutionChain>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Header = styled.header``;

const CharacterContainer = styled.div``;

const NameIdContainer = styled.div``;

const Name = styled.h1``;

const Id = styled.p``;

const Types = styled.div``;
const Type = styled.div``;

const Image = styled.img``;

const Main = styled.main``;

const Species = styled.section``;

const Describe = styled.p``;
const Height = styled.p``;
const Weight = styled.p``;
const Abilities = styled.div``;
const Ability = styled.div``;
const BaseStats = styled.div``;
const Stat = styled.div``;
const StatTitle = styled.span``;
const StatValue = styled.span``;
const EvolutionChain = styled.div``;
const EvolutionCard = styled.div``;
export default Detail;
