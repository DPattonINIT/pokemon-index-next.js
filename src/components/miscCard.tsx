"use client";
import { FC } from "react";

interface MiscProps {
  abilities: string[];
  moves: string[];
  location: string;
  evolution: string;
}

const Misc: FC<MiscProps> = ({ abilities, moves, location, evolution }) => {
  return (
    <div className="miscContainer">
      <div className="abilitiesContainer">
        <h1 className="text-center">Abilities:</h1>
        <h2>{abilities.join(", ")}</h2>
      </div>
      <div className="movesContainer">
        <h1 className="text-center">Moves:</h1>
        <h2>{moves.join(", ")}</h2>
      </div>
      <div className="locationContainer">
        <h1 className="text-center">Location:</h1>
        <h2>{location}</h2>
      </div>
      <div className="evolutionContainer">
        <h1 className="text-center">Evolution Path:</h1>
        <h2>{evolution}</h2>
      </div>
    </div>
  );
};

export default Misc;
