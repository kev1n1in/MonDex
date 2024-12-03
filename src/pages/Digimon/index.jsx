import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Header from "../../components/Header";
import { getDigimon } from "../../services/digimonService";

const Digimon = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["digimon"],
    queryFn: getDigimon,
  });
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Wrapper>
      <Header />
      <CardsList>
        {data?.map((digimon, index) => {
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
export default Digimon;
