import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FetchButton from "../../components/Buttons/FetchButton";
import ToggleButton from "../../components/Buttons/SwitchButton/Button";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { getDigimon } from "../../services/digimonService";
import { getPokemon } from "../../services/pokemonService";

const MonDex = () => {
  const [pagination, setPagination] = useState({ offset: 0, page: 0 });
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
    queryKey: ["pokemon", name, location.pathname, pagination.offset],
    queryFn: () => getPokemon(name, pagination.offset),
    enabled: isPokemon,
  });
  const {
    data: digimonData,
    error: digimonError,
    isLoading: isLoadingDigimon,
  } = useQuery({
    queryKey: ["digimon", name, location.pathname, pagination.page],
    queryFn: () => getDigimon(name, pagination.page),
    enabled: isDigimon,
  });
  const updatePagination = (key, value) => {
    setPagination((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlOffset = parseInt(queryParams.get("offset") || "0", 10);
    const urlPage = parseInt(queryParams.get("page") || "0", 10);
    if (isPokemon) {
      updatePagination("offset", urlOffset);
    } else if (isDigimon) {
      updatePagination("page", urlPage);
    }
  }, [location.search, isPokemon, isDigimon]);

  useEffect(() => {
    if (isPokemon) {
      navigate(`?offset=${pagination.offset}`, { replace: true });
    } else if (isDigimon) {
      navigate(`?page=${pagination.page}`, { replace: true });
    }
  }, [pagination, navigate, isPokemon, isDigimon]);

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
        {pokemonData?.results?.map((pokemon, index) => {
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
      <FetchButton
        offset={pagination.offset}
        setOffset={(offset) => updatePagination("offset", offset)}
        page={pagination.page}
        setPage={(page) => updatePagination("page", page)}
      />
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
