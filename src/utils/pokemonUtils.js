export function formatPokemon(pokemonDetails) {
  return {
    id: pokemonDetails.id,
    name: pokemonDetails.name,
    sprite: pokemonDetails.sprites.front_default,
    types: pokemonDetails.types.map((typeInfo) => typeInfo.type.name),
    abilities: pokemonDetails.abilities.map(
      (abilityInfo) => abilityInfo.ability.name,
    ),
    stats: pokemonDetails.stats.map((statInfo) => {
      return { statName: statInfo.stat.name, baseStat: statInfo.base_stat };
    }),
  };
}
