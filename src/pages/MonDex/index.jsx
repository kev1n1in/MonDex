import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Card from "../../components/Card";
import Header from "../../components/Header";
import ToggleButton from "../../components/SwitchButton/Button";
import { getDigimon } from "../../services/digimonService";
import { getPokemon } from "../../services/pokemonService";

const MonDex = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPokemon = location.pathname.includes("pokemon");
  const isDigimon = location.pathname.includes("digimon");
  const name = null;

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: isLoadingPokemon,
  } = useQuery({
    queryKey: ["pokemon", name, location.pathname],
    queryFn: () => getPokemon(name),
    enabled: isPokemon,
  });
  const {
    data: digimonData,
    error: digimonError,
    isLoading: isLoadingDigimon,
  } = useQuery({
    queryKey: ["digimon", name, location.pathname],
    queryFn: () => getDigimon(name),
    enabled: isDigimon,
  });

  const handleCardClick = (name) => {
    if (isPokemon) {
      navigate(`/pokemon/${name}`);
    } else if (isDigimon) {
      navigate(`/digimon/${name}`);
    }
  };
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
              onClick={() => handleCardClick(pokemon.name)}
            />
          );
        })}
        {digimonData?.map((digimon, index) => {
          return (
            <Card
              key={index}
              name={digimon.name}
              imageUrl={digimon.image}
              onClick={() => handleCardClick(digimon.name)}
            />
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
