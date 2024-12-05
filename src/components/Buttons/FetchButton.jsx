import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
const FetchButton = ({ setOffset, offset, page, setPage }) => {
  const location = useLocation();
  const isPokemon = location.pathname.includes("pokemon");
  const isDigimon = location.pathname.includes("digimon");

  const handleNextPagePokemon = () => {
    setOffset(offset + 20);
  };
  const handlePreviousPagePokemon = () => {
    setOffset(Math.max(offset - 20, 0));
  };
  const handleNextPageDigimon = () => {
    setPage(page + 1);
  };
  const handlePreviousPageDigimon = () => {
    setPage(Math.max(page - 1, 1));
  };

  return (
    <Wrapper>
      {isPokemon && (
        <Buttons>
          <Button onClick={handlePreviousPagePokemon}>Previous</Button>
          <Button onClick={handleNextPagePokemon}>Next</Button>
        </Buttons>
      )}

      {isDigimon && (
        <Buttons>
          <Button onClick={handlePreviousPageDigimon}>Previous</Button>
          <Button onClick={handleNextPageDigimon}>Next</Button>
        </Buttons>
      )}
    </Wrapper>
  );
};

FetchButton.propTypes = {
  setOffset: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  width: 100%;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  width: 45%;
`;
export default FetchButton;
