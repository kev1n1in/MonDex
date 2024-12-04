const url = "https://pokeapi.co/api/v2";

export const getPokemon = async (name, offset) => {
  try {
    if (name) {
      const responseSpecies = await fetch(`${url}/pokemon-species/${name}`);
      if (!responseSpecies.ok) {
        throw new Error(`Failed to fetch Pokémon species details for ${name}.`);
      }
      const speciesDetails = await responseSpecies.json();
      const englishDescribe = speciesDetails.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      )?.flavor_text;

      const evolutionChainUrl = speciesDetails.evolution_chain.url;
      const responseEvolutionChain = await fetch(evolutionChainUrl);
      if (!responseEvolutionChain.ok) {
        throw new Error(`Failed to fetch Evolution Chain for ${name}.`);
      }
      const evolutionChain = await responseEvolutionChain.json();

      const responsePokemon = await fetch(`${url}/pokemon/${name}`);
      if (!responsePokemon.ok) {
        throw new Error(`Failed to fetch Pokémon details for ${name}.`);
      }
      const pokemonDetails = await responsePokemon.json();

      const pokemonData = {
        name: pokemonDetails.name,
        id: pokemonDetails.id,
        image: pokemonDetails.sprites.front_default,
        types: pokemonDetails.types.map((type) => type.type.name),
        height: (pokemonDetails.height * 0.1).toFixed(2),
        weight: (pokemonDetails.weight * 0.1).toFixed(2),
        baseStats: pokemonDetails.stats.reduce((acc, stat) => {
          acc[stat.stat.name] = stat.base_stat;
          return acc;
        }, {}),
        abilities: pokemonDetails.abilities.map(
          (ability) => ability.ability.name
        ),
        describe: englishDescribe,
        evolutionChain: getEvolutionChain(evolutionChain.chain),
      };
      console.log(pokemonData);
      return pokemonData;
    }

    const response = await fetch(`${url}/pokemon?offset=${offset}&limit=20`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon list.");
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
    console.log(data.next, data.previous);
    return { results: details, next: data.next, previous: data.previous };
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getEvolutionChain = (chain) => {
  const evolutionChain = [];

  const extractEvolution = (evolution) => {
    const species = evolution?.species;
    if (species && species.name && species.url) {
      const speciesId = species.url.split("/").filter(Boolean).pop();

      evolutionChain.push({
        name: species.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesId}.png`,
      });
    }
    evolution.evolves_to?.forEach(extractEvolution);
  };
  extractEvolution(chain);
  return evolutionChain;
};
