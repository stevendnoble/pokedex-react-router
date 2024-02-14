const BASE_URL = "https://pokeapi.co/api/v2/";

// Fetch details for a single Pokémon by name
export const fetchPokemonDetails = async (pokemonName) => {
  try {
    const response = await fetch(
      `${BASE_URL}pokemon/${pokemonName.toLowerCase()}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch Pokémon details:", error);
    throw error;
  }
};

// Fetch species information to get the evolution chain URL
export const fetchPokemonSpecies = async (pokemonId) => {
  try {
    const response = await fetch(`${BASE_URL}pokemon-species/${pokemonId}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch Pokémon species:", error);
    throw error;
  }
};

// Fetch the evolution chain data
export const fetchEvolutionChain = async (evolutionChainUrl) => {
  try {
    const response = await fetch(evolutionChainUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch evolution chain:", error);
    throw error;
  }
};
