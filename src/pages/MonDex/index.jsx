import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AlertMessage from "../../components/AlertMessage";
import FetchButton from "../../components/Buttons/FetchButton";
import ToggleButton from "../../components/Buttons/SwitchButton/Button";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import NoDataContainer from "../../components/NoDataMessage.jsx/Message";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { getDigimon } from "../../services/digimonService";
import { getPokemon } from "../../services/pokemonService";

const MonDex = () => {
  const [pagination, setPagination] = useState({ offset: 0, page: 0 });
  const location = useLocation();
  const navigate = useNavigate();
  const isPokemon = location.pathname.includes("pokemon");
  const isDigimon = location.pathname.includes("digimon");
  const name = null;
  const isOnline = useNetworkStatus();

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
  const noData =
    digimonData?.length === 0 || pokemonData?.results?.length === 0;

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
      localStorage.setItem("offset", pagination.offset);
      navigate(`/pokemon/${name}`);
    } else if (isDigimon) {
      localStorage.setItem("page", pagination.page);
      navigate(`/digimon/${name}`);
    }
  };

  return (
    <Wrapper>
      <Loader isLoading={isLoadingDigimon || isLoadingPokemon} />
      {!isOnline && <AlertMessage message="You are offline!" />}
      {pokemonError && (
        <AlertMessage
          message={`Error loading Pokemon: ${pokemonError.message}`}
        />
      )}
      {digimonError && (
        <AlertMessage
          message={`Error loading Digimon: ${digimonError.message}`}
        />
      )}
      <Header />
      <ToggleButton />
      {noData ? (
        <NoDataContainer isDigimon={isDigimon} isPokemon={isPokemon} />
      ) : (
        <>
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
                  types={digimon.types}
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
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: auto;
  margin-bottom: 48px;
`;

const CardsList = styled.div`
  margin: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
export default MonDex;
