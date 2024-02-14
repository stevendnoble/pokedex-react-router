import { useEffect, useState } from "react";
import { fetchPokemonSpecies, fetchEvolutionChain } from "../../api/pokeApi";

// Helper function to recursively render the evolution chain
const renderEvolution = (species, evolutionDetails) => {
  return (
    <div key={species.name}>
      <p>{species.name.toUpperCase()}</p>
      {evolutionDetails &&
        evolutionDetails.length > 0 &&
        evolutionDetails.map((evolution) => (
          <div key={evolution.species.name}>
            <p>→ Evolves to: {evolution.species.name.toUpperCase()}</p>
            {evolution.evolves_to &&
              renderEvolution(evolution.species, evolution.evolves_to)}
          </div>
        ))}
    </div>
  );
};

export function EvolutionChain({ pokemon }) {
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      const species = await fetchPokemonSpecies(pokemon.id);
      const evolutionData = await fetchEvolutionChain(
        species.evolution_chain.url,
      );
      setEvolutionChain(evolutionData);
    };

    fetchEvolutionData();
  }, [pokemon.id]); // Dependency array to ensure the effect runs once or when pokemon.id changes

  if (!evolutionChain) {
    return <p>Loading evolution chain...</p>;
  }

  return (
    <div>
      <h2>Evolution Chain</h2>
      {renderEvolution(
        evolutionChain.chain.species,
        evolutionChain.chain.evolves_to,
      )}
    </div>
  );
}
