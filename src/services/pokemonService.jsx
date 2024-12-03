const url = "https://pokeapi.co/api/v2/pokemon";

export const getPokemon = async () => {
  try {
    const response = await fetch(`${url}?count=20`);
    if (!response.ok) {
      throw new Error("Failed to fetch.");
    }
    const data = await response.json();

    const details = await Promise.all(
      data.results.map(async (pokemon) => {
        const responseDetail = await fetch(pokemon.url);
        if (!responseDetail.ok) {
          throw new Error("Failed to fetch Pokémon details.");
        }
        const details = await responseDetail.json();
        return {
          name: pokemon.name,
          imageUrl: details.sprites.front_default,
          types: details.types.map((type) => type.type.name),
        };
      })
    );
    console.log(details);
    return details;
  } catch (error) {
    console.error(error);
    return [];
  }
};
