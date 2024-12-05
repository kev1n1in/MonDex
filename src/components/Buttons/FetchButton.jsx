import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

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
    <div>
      {isPokemon && (
        <div>
          <button onClick={handlePreviousPagePokemon}>Previous</button>
          <button onClick={handleNextPagePokemon}>Next</button>
        </div>
      )}

      {isDigimon && (
        <div>
          <button onClick={handlePreviousPageDigimon}>Previous</button>
          <button onClick={handleNextPageDigimon}>Next</button>
        </div>
      )}
    </div>
  );
};

FetchButton.propTypes = {
  setOffset: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default FetchButton;
