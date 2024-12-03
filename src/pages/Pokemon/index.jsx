import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getPokemon } from "../../services/pokemonService";

const Pokemon = () => {
  const pokemonId = 1;

  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => getPokemon(pokemonId),
  });
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Title>PokemonDex</Title>
      <h2>{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
    </>
  );
};
const Title = styled.h1``;

export default Pokemon;
