"use client";
import FavoritesList from "@/components/favoritesList";
import Misc from "@/components/miscCard";
import PokemonCard from "@/components/pokemonCard";
import SearchBar from "@/components/searchBar";
import { useState, useEffect } from "react";
import { saveToLocalStorage, getLocalStorage } from "@/utils/localStorage";
import type { PokemonData } from "@/types/PokemonData";


export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);

  const [favorites, setFavorites] = useState<string[]>([]); 

 
  async function fetchPokemon(query: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) return alert("Pokémon not found.");
    const data = await response.json();

   
    const speciesResponse = await fetch(data.species.url);
    if (!speciesResponse.ok) return alert("Species data not found.");
    const speciesData = await speciesResponse.json();

   
    const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
    if (!evolutionChainResponse.ok) return alert("Evolution chain data not found.");
    const evolutionChainData = await evolutionChainResponse.json();

    type EvolutionChain = {
      species: { name: string };
      evolves_to: EvolutionChain[];
    };
    
    const extractEvolution = (chain: EvolutionChain): string => {
      let evolution = chain.species.name;
      if (chain.evolves_to.length > 0) {
        evolution += " → " + chain.evolves_to.map(extractEvolution).join(" → ");
      }
      return evolution;
    };
    
    

    const evolutionPath = extractEvolution(evolutionChainData.chain);

    const location = data.game_indices.length
  ? data.game_indices.map((g: { version: { name: string } }) => g.version.name).join(", ")
  : "N/A";


    setPokemon({
      name: data.name,
      image: data.sprites.front_default,
      shinyImage: data.sprites.front_shiny,
      type: data.types.map((t: { type: { name: string } }) => t.type.name).join(", "),
      abilities: data.abilities.map((a: { ability: { name: string } }) => a.ability.name),
      moves: data.moves.map((m: { move: { name: string } }) => m.move.name),
      
      location, 
      evolution: evolutionPath, 
    });
  }

  
  const addToFavorites = (name: string) => {
    if (favorites.length >= 8) {
      alert("Delete Pokémon to add more to the favorites list");
      return;
    }
    if (!favorites.includes(name)) {
      const updatedFavorites = [...favorites, name];
      setFavorites(updatedFavorites); 
      saveToLocalStorage(name); 
    }
  };

  
  const removeFromFavorites = (name: string) => {
    const updatedFavorites = favorites.filter((fav) => fav !== name);
    setFavorites(updatedFavorites); 
  };

  
  const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    fetchPokemon(randomId.toString()); 
  };


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = getLocalStorage();
      setFavorites(storedFavorites); 
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pokemonFavorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <main className="pokemonBg min-h-screen p-6">
      <SearchBar onSearch={fetchPokemon} />
      <div className="flex justify-between gap-8 mt-8">
        <div className="pokemonSection w-1/3 p-4 shadow-md">
          {pokemon && (
            <PokemonCard
              {...pokemon}
              onFavorite={() => addToFavorites(pokemon.name)} 
              onRandom={getRandomPokemon}
            />
          )}
        </div>

    
        <div className="miscSection w-1/3 p-4 shadow-md">
          {pokemon && (
            <Misc
              abilities={pokemon.abilities}
              moves={pokemon.moves}
              location={pokemon.location}
              evolution={pokemon.evolution}
            />
          )}
        </div>

        
        <div className="favoritesSection w-1/3 p-4 shadow-md">
          <FavoritesList
            favorites={favorites}
            onSelect={fetchPokemon}
            onRemove={removeFromFavorites} 
          />
        </div>
      </div>
    </main>
  );
}
