import { useState, useContext } from "react";
import { PokemonDetailsWithProvider } from "../PokemonDetails/PokemonDetails";
import { PokedexContext, PokedexProvider } from "../Pokedex/PokedexProvider";
import { fetchPokemonDetails } from "../../api/pokeApi";
import { formatPokemon } from "../../utils/pokemonUtils";
import styles from "./Search.module.css";

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { encounter, encounteredPokemon } = useContext(PokedexContext);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");
    try {
      if (searchTerm in encounteredPokemon) {
        setPokemon(encounteredPokemon[searchTerm]);
      } else {
        // Fetch the basic Pokémon details
        const details = await fetchPokemonDetails(searchTerm);
        const formattedPokemon = formatPokemon(details);
        encounter(formattedPokemon);
        setPokemon(formattedPokemon);
      }
    } catch (err) {
      setError("Failed to fetch Pokémon. Please try again.");
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchPage}>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {pokemon && <PokemonDetailsWithProvider pokemon={pokemon} />}
    </div>
  );
}

export function SearchWithProvider() {
  return (
    <PokedexProvider>
      <Search />
    </PokedexProvider>
  );
}
