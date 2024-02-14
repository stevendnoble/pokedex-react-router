import { useContext } from "react";
import { PokedexContext, PokedexProvider } from "../Pokedex/PokedexProvider";
import { Button } from "../Button/Button";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import styles from "./Pokedex.module.css";

export function Pokedex() {
  const { release, capturedPokemon, encounteredPokemon } =
    useContext(PokedexContext);
  const capturedPokemonFullDetails = capturedPokemon.map(
    (pokemonName) => encounteredPokemon[pokemonName],
  );

  return (
    <div className={styles.pokedexContainer}>
      <h2>My Pokedex</h2>
      <div className={styles.pokemonList}>
        {capturedPokemonFullDetails.map((pokemon) => (
          <div key={pokemon.name} className={styles.pokemonCard}>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <h3>{capitalizeFirstLetter(pokemon.name)}</h3>
            <Button
              onClick={() => release(pokemon)}
              className={styles.releaseBtn}
              buttonText="Release"
              small={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PokedexWithProvider() {
  return (
    <PokedexProvider>
      <Pokedex />
    </PokedexProvider>
  );
}
