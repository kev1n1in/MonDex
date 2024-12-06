import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AlertMessage from "../../components/AlertMessage";
import ReturnButton from "../../components/Buttons/Return/ReturnButton";
import BaseStats from "../../components/DetailPage/BaseStatsChart";
import Evolution from "../../components/DetailPage/Evolution";
import DetailHeader from "../../components/DetailPage/Header";
import SkillAndAbility from "../../components/DetailPage/SkillsAndAbility";
import Species from "../../components/DetailPage/Species";
import Loader from "../../components/Loader";
import NoDataContainer from "../../components/NoDataMessage.jsx/Message";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import { getDigimon } from "../../services/digimonService";
import { getPokemon } from "../../services/pokemonService";

const Detail = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isPokemon = location.pathname.includes("pokemon");
  const isDigimon = location.pathname.includes("digimon");
  const { name } = useParams();
  const isOnline = useNetworkStatus();
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
  const noData =
    digimonData?.length === 0 || pokemonData?.results?.length === 0;
  const handleReturn = () => {
    const storedPage = localStorage.getItem("page");
    const storedOffset = localStorage.getItem("offset");
    if (isPokemon) {
      navigate(`/pokemon?offset=${storedOffset}`);
    } else if (isDigimon) {
      navigate(`/digimon?page=${storedPage}`);
    }
  };

  if (pokemonError)
    return <div>Error loading Pokemon: {pokemonError.message}</div>;
  if (digimonError)
    return <div>Error loading Digimon: {digimonError.message}</div>;

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
      {noData ? (
        <>
          <NoDataContainer isDigimon={isDigimon} isPokemon={isPokemon} />
          <ReturnButton onClick={handleReturn} />
        </>
      ) : (
        <>
          <DetailHeader
            data={data}
            isDigimon={isDigimon}
            handleReturn={handleReturn}
          />
          <Main>
            <Species data={data} isPokemon={isPokemon} />
            <SkillAndAbility
              data={data}
              isPokemon={isPokemon}
              isDigimon={isDigimon}
            />
            <BaseStats baseStats={data?.baseStats} />
            <Evolution data={data} isPokemon={isPokemon} />
          </Main>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 50px;
`;

const Main = styled.main`
  margin: 12px 12px;
`;

export default Detail;
