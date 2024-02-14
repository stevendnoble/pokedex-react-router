import { useContext, useMemo } from "react";
import { Button } from "../Button/Button";
import { EvolutionChain } from "../EvolutionChain/EvolutionChain";
import { PokedexContext, PokedexProvider } from "../Pokedex/PokedexProvider";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import styles from "./PokemonDetails.module.css";

export function PokemonDetails({ pokemon }) {
  const { capture, capturedPokemon } = useContext(PokedexContext);

  const isCaptured = useMemo(
    () => capturedPokemon.some((pokemonName) => pokemonName === pokemon.name),
    [pokemon, capturedPokemon],
  );

  return (
    <div className={styles.detailContainer}>
      <div className={styles.pokemonInfo}>
        <h2>{pokemon.name.toUpperCase()}</h2>
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className={`${styles.detailImage} ${styles.showSmall}`}
        />
        <p className={styles.detailText}>
          <b>Type:</b> {pokemon.types.join(", ")}
        </p>
        <p className={styles.detailText}>
          <b>Abilities:</b> {pokemon.abilities.join(", ")}
        </p>
        <div className={styles.pokemonStats}>
          <h3>Stats</h3>
          {pokemon.stats.map((stat) => (
            <p key={stat.statName} className={styles.detailText}>
              <b>{`${stat.statName}:`}</b> {`${stat.baseStat}`}
            </p>
          ))}
        </div>
        {isCaptured ? (
          <p>{capitalizeFirstLetter(pokemon.name)} is in the Pokédex</p>
        ) : (
          <Button
            onClick={() => capture(pokemon.name)}
            disabled={isCaptured}
            className={styles.captureBtn}
            buttonText={`Capture ${capitalizeFirstLetter(pokemon.name)}`}
          />
        )}
      </div>
      <div className={styles.evolutionChain}>
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className={`${styles.detailImage} ${styles.hideSmall}`}
        />
        <EvolutionChain pokemon={pokemon} />
      </div>
    </div>
  );
}

export function PokemonDetailsWithProvider({ pokemon }) {
  return (
    <PokedexProvider>
      <PokemonDetails pokemon={pokemon} />
    </PokedexProvider>
  );
}
