import { createContext, useState, useCallback } from "react";

export const PokedexContext = createContext();

const useCapturedPokemen = () => {
	const [encounteredPokemon, setEncounteredPokemon] = useState(
		JSON.parse(localStorage.getItem("cachedEncounteredPokemon")) || {},
	);
	const [capturedPokemon, setCapturedPokemon] = useState(
		JSON.parse(localStorage.getItem("cachedCapturedPokemon")) || [],
	);

	const encounter = useCallback(
		(pokemon) => {
			const nextEncounteredPokemon = {
				...encounteredPokemon,
				[pokemon.name]: pokemon,
			};
			localStorage.setItem(
				"cachedEncounteredPokemon",
				JSON.stringify(nextEncounteredPokemon),
			);
			setEncounteredPokemon(nextEncounteredPokemon);
		},
		[encounteredPokemon],
	);

	const capture = useCallback(
		(pokemonName) => {
			if (capturedPokemon.find((p) => p === pokemonName)) return;

			const nextCapturedPokemon = [...capturedPokemon, pokemonName];
			localStorage.setItem(
				"cachedCapturedPokemon",
				JSON.stringify(nextCapturedPokemon),
			);
			setCapturedPokemon(nextCapturedPokemon);
		},
		[capturedPokemon],
	);

	const release = useCallback(
		(pokemonName) => {
			const nextCapturedPokemon = capturedPokemon.filter(
				(p) => p !== pokemonName,
			);
			localStorage.setItem(
				"cachedCapturedPokemon",
				JSON.stringify(nextCapturedPokemon),
			);
			setCapturedPokemon(nextCapturedPokemon);
		},
		[capturedPokemon],
	);

	return {
		encounter,
		capture,
		release,
		encounteredPokemon,
		capturedPokemon,
	};
};

export const PokedexProvider = ({ children }) => {
	const { encounter, capture, release, encounteredPokemon, capturedPokemon } =
		useCapturedPokemen();

	return (
		<PokedexContext.Provider
			value={{
				encounter,
				capture,
				release,
				encounteredPokemon,
				capturedPokemon,
			}}
		>
			{children}
		</PokedexContext.Provider>
	);
};
