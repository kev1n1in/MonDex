import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { getPokemon } from "../../services/pokemonService";

const Pokemon = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
  });
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Wrapper>
      <Header />
      <CardsList>
        {data?.map((pokemon, index) => {
          return (
            <Card
              key={index}
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              types={pokemon.types}
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
export default Pokemon;
