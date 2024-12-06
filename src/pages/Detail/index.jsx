import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BaseStats from "../../components/DetailPage/BaseStatsChart";
import Evolution from "../../components/DetailPage/Evolution";
import DetailHeader from "../../components/DetailPage/Header";
import SkillAndAbility from "../../components/DetailPage/SkillsAndAbility";
import Species from "../../components/DetailPage/Species";
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
    const storedPage = localStorage.getItem("page");
    const storedOffset = localStorage.getItem("offset");
    if (isPokemon) {
      navigate(`/pokemon?offset=${storedOffset}`);
    } else if (isDigimon) {
      navigate(`/digimon?page=${storedPage}`);
    }
  };
  if (isLoadingPokemon || isLoadingDigimon) return <div>Loading...</div>;
  if (pokemonError)
    return <div>Error loading Pokemon: {pokemonError.message}</div>;
  if (digimonError)
    return <div>Error loading Digimon: {digimonError.message}</div>;

  return (
    <Wrapper>
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
        {isPokemon && data?.baseStats && (
          <BaseStats baseStats={data.baseStats} />
        )}

        <Evolution data={data} isPokemon={isPokemon} />
      </Main>
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
