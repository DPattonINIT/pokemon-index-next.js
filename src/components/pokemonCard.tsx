"use client";
import { useState } from "react";

interface PokemonProps {
  name: string;
  image: string;
  shinyImage: string;
  type: string;
  abilities: string[];
  moves: string[];
  location: string;
  evolution: string;
  onFavorite: () => void;
  onRandom: () => void;
}

function PokemonCard({
  name,
  image,
  shinyImage,
  type,
  abilities,
  moves,
  location,
  evolution,
  onFavorite,
  onRandom,
}: PokemonProps) {
  const [isShiny, setIsShiny] = useState(false);

  return (
    <div className="pokemonContainer">
      <div className="topCard">
        <img
          src={isShiny ? shinyImage : image}
          alt={name}
          className="w-32 mx-auto"
        />
        <h2 className="text-center text-xl font-bold">{name}</h2>
      </div>

      <div className="infoBox">
        <div className="flex gap-2">
          <button
            onClick={() => setIsShiny(!isShiny)}
            className="Btn bg-black text-white rounded-md hover:bg-yellow-600"
          >
            Shiny
          </button>
          <button
            onClick={onRandom}
            className="bg-black text-white rounded-md hover:bg-blue-600"
          >
            Random
          </button>
          <button
            onClick={onFavorite}
            className="bg-black text-white rounded-md hover:bg-green-600"
          >
            Favorite
          </button>
        </div>
      </div>

      <div className="bottomCard pt-2">
        <h1 className="text-center">Type: {type}</h1>
      </div>
    </div>
  );
}

export default PokemonCard;
