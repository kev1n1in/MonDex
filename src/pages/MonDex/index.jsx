import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../../components/Card";
import Header from "../../components/Header";
import ToggleButton from "../../components/ToggleButton/Button";
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
    queryKey: ["pokemon", location.pathname],
    queryFn: getPokemon,
    enabled: isPokemon,
  });
  const {
    data: digimonData,
    error: digimonError,
    isLoading: isLoadingDigimon,
  } = useQuery({
    queryKey: ["digimon", location.pathname],
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
      <ToggleButton />
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
            <Card key={index} name={digimon.name} imageUrl={digimon.image} />
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
