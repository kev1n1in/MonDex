import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import digimonImg from "./digimon.png";
import pokemonImg from "./pokemon.png";

const ToggleButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPokemon = location.pathname.includes("pokemon");

  const handleClick = () => {
    if (isPokemon) {
      navigate("/digimon");
    } else {
      navigate("/pokemon");
    }
  };

  return (
    <Wrapper onClick={handleClick}>
      <Image src={isPokemon ? digimonImg : pokemonImg}></Image>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #cdcdcd;
  right: 24px;
  bottom: 50px;
  z-index: 10;
  @media (min-width: 768px) {
    width: 84px;
    height: 84px;
  }
  @media (min-width: 1000px) {
    width: 120px;
    height: 120px;
  }
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
  @media (min-width: 768px) {
    width: 64px;
    height: 64px;
  }
  @media (min-width: 1000px) {
    width: 96px;
    height: 96px;
  }
`;
export default ToggleButton;
