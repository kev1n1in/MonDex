import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { getDigimon } from "../../services/digimonService";
import { getPokemon } from "../../services/pokemonService";

const MonDex = () => {
  const location = useLocation();
  const isPokemon = location.pathname.includes("pokemon");
  const isDigimon = location.pathname.includes("digimon");

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: isLoadingPokemon,
  } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
    enabled: isPokemon,
  });
  const {
    data: digimonData,
    error: digimonError,
    isLoading: isLoadingDigimon,
  } = useQuery({
    queryKey: ["digimon"],
    queryFn: getDigimon,
    enabled: isDigimon,
  });
  if (isLoadingPokemon || isLoadingDigimon) return <div>Loading...</div>;
  if (pokemonError)
    return <div>Error loading Pokemon: {pokemonError.message}</div>;
  if (digimonError)
    return <div>Error loading Digimon: {digimonError.message}</div>;

  return (
    <Wrapper>
      <Header />
      <h1>MonDex</h1>
      <CardsList>
        {pokemonData?.map((pokemon, index) => {
          return (
            <Card
              key={index}
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              types={pokemon.types}
            />
          );
        })}
        {digimonData?.map((digimon, index) => {
          return (
            <div key={index}>
              <h1>{digimon.name}</h1>
              <img src={digimon.image} alt={digimon.name} />
            </div>
          );
        })}
      </CardsList>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: auto;
`;
const CardsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
export default MonDex;
