const url = "https://digi-api.com/api/v1/digimon";

export const getDigimon = async (name, page) => {
  try {
    if (name) {
      const responseSpecies = await fetch(`${url}/${name}`);
      if (!responseSpecies.ok) {
        throw new Error(`Failed to fetch Pokémon species details for ${name}.`);
      }
      const speciesDetails = await responseSpecies.json();
      const englishDescribe = speciesDetails.descriptions.find(
        (entry) => entry.language === "en_us"
      )?.description;
      console.log(speciesDetails);
      return { speciesDetails: speciesDetails, descriptions: englishDescribe };
    }

    const response = await fetch(`${url}?page=${page}&pageSize=20`);
    if (!response.ok) {
      throw new Error("Failed to fetch.");
    }
    const data = await response.json();
    console.log(data);
    const digimonsDetails = await Promise.all(
      data.content.map(async (digimon) => {
        const digimonResponse = await fetch(digimon.href);
        if (!digimonResponse.ok) {
          throw new Error(
            `Failed to fetch details for Digimon ${digimon.name}`
          );
        }
        const digimonDetails = await digimonResponse.json();
        const type = digimonDetails.types
          ? digimonDetails.types.map((t) => t.type)
          : [];

        return {
          name: digimonDetails.name,
          types: type,
          image: digimonDetails.images ? digimonDetails.images[0].href : "", // 获取第一张图片的 URL
        };
      })
    );
    console.log(digimonsDetails);
    return digimonsDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};
