const url = "https://pokeapi.co/api/v2/pokemon";

export const getPokemon = async (pokemonId) => {
  try {
    const response = await fetch(`${url}/${pokemonId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
