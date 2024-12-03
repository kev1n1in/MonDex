const url = "https://digi-api.com/api/v1/digimon";

export const getDigimon = async () => {
  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error("Failed to fetch.");
    }
    const data = await response.json();
    console.log(data);
    return data.content;
  } catch (error) {
    console.error(error);
    return [];
  }
};
