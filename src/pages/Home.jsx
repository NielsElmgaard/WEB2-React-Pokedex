import useFetchAll from "../hooks/useFetchAll.jsx";
import { useState, useRef } from "react";
import useSound from "use-sound";
import hoverSound from "../assets/shiny_8.mp3";
import useFetchPokemon from "../hooks/useFetchPokemon.jsx";
import PokemonDisplay from "./PokemonDisplay.jsx";
import PokemonImage from "../components/PokemonImage.jsx";
import { useQuery } from '@tanstack/react-query';


function Home() {

  const { data, error, isLoading } = useQuery(['users'], useFetchAll(
    "https://pokeapi.co/api/v2/pokemon?limit=1350",
  ));
  const [pokemons] = useFetchAll(
    "https://pokeapi.co/api/v2/pokemon?limit=1350",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil((pokemons?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = pokemons?.slice(startIndex, endIndex) || [];

  const [currentPokemon, setCurrentPokemon] = useState(null);

  // PokemonDisplay page
  // Go back to home -> SetCurrentPokemon to null
  if (currentPokemon) {
    return (
      <div id="back-button-container">
        <div id="back-button-row">
          <button onClick={() => setCurrentPokemon(null)}>Go Back</button>
        </div>
        <PokemonDisplay selectedPokemon={currentPokemon} />
      </div>
    );
  }

  // Pokemon Grid List
  return (
    <>
      <div className="pokemon-container">
        {currentItems.map((pokemon) => {
          const parts = pokemon.url.split("/");
          const id = parts[parts.length - 2];
          return (
            <PokemonCard
              key={id}
              id={id}
              name={pokemon.name}
              onClick={() => setCurrentPokemon(pokemon)}
            />
          );
        })}
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous page
        </button>

        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next page
        </button>
      </div>
    </>
  );
}

function PokemonCard({ id, name, onClick }) {
  const [pokemon] = useFetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const [play, { stop }] = useSound(hoverSound, {
    volume: 0.5,
  });
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      play();
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    stop();
  };

  if (!pokemon) {
    return <div className="pokemon-card-container">Loading...</div>;
  }

  const type = pokemon?.types?.[0]?.type?.name || "normal";

  return (
    <div
      className="pokemon-card-container"
      style={getPokemonCardStyle(type)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <p className="pokemon-id">#{id}</p>
      <div className="pokeImg-container">
        <PokemonImage id={id} />
      </div>
      <div className="pokemon-info">
        <h1 className="pokeName">
          {name[0].toUpperCase() + name.substring(1)}
        </h1>
        <p className="type-label">
          {type[0].toUpperCase() + type.substring(1)}
        </p>
      </div>
    </div>
  );
}

function getPokemonCardStyle(type) {
  const colors = {
    normal: { bg: "#A8A77A", text: "white" },
    fire: { bg: "#EE8130", text: "white" },
    water: { bg: "#6390F0", text: "white" },
    electric: { bg: "#F7D02C", text: "black" },
    grass: { bg: "#7AC74C", text: "white" },
    ice: { bg: "#96D9D6", text: "black" },
    fighting: { bg: "#C22E28", text: "white" },
    poison: { bg: "#A33EA1", text: "white" },
    ground: { bg: "#E2BF65", text: "black" },
    flying: { bg: "#A98FF3", text: "white" },
    psychic: { bg: "#F95587", text: "white" },
    bug: { bg: "#A6B91A", text: "white" },
    rock: { bg: "#B6A136", text: "white" },
    ghost: { bg: "#735797", text: "white" },
    dragon: { bg: "#6F35FC", text: "white" },
    dark: { bg: "#705746", text: "white" },
    steel: { bg: "#B7B7CE", text: "black" },
    fairy: { bg: "#D685AD", text: "white" },
  };

  const config = colors[type] || colors.normal;

  return {
    backgroundColor: config.bg,
    color: config.text,
  };
}

export default Home;
