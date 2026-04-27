import useFetchAll from "../../hooks/useFetchAll.jsx";
import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import hoverSound from "../../assets/shiny_8.mp3";
import useFetchPokemon from "../../hooks/useFetchPokemon.jsx";
import PokemonDisplay from "../PokemonDisplay/PokemonDisplay.jsx";
import PokemonImage from "../../components/PokemonImage.jsx";
import { useQueryClient } from "@tanstack/react-query";
import "./Home.css";

function Home() {
  const { isPending, error, data } = useFetchAll();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [goToPage, setGoToPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPokemon, setCurrentPokemon] = useState(null);

  const pokemonPerPage = 10;

  const filteredData = data?.filter((p) => {
    if (search === "") {
      return p;
    }
    return p.name.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil((filteredData?.length || 0) / pokemonPerPage);
  const startIndex = (currentPage - 1) * pokemonPerPage;
  const endIndex = startIndex + pokemonPerPage;
  const currentItems = filteredData?.slice(startIndex, endIndex) || [];

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPageItems = filteredData.slice(
        currentPage * pokemonPerPage,
        (currentPage + 1) * pokemonPerPage,
      );

      nextPageItems.forEach((p) => {
        const parts = p.url.split("/");
        const id = parts[parts.length - 2];
        queryClient.prefetchQuery({
          queryKey: ["pokemon", id],
          queryFn: () => fetch(p.url).then((res) => res.json()),
          staleTime: 1000 * 60 * 5,
        });
      });
    }
  }, [currentPage, filteredData, queryClient]);

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

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

  function handleChange(e) {
    const inputValue = e.target.value;
    setGoToPage(inputValue);

    if (inputValue !== "") {
      const pageToGoTo = Math.max(1, Math.min(inputValue, totalPages)); // Ensure to not go over total pages or under page 1

      if (pageToGoTo > 0) {
        setGoToPage(pageToGoTo);
      }
      setCurrentPage(pageToGoTo);
    }
  }

  // Pokemon List
  return (
    <>
      <div className="pagination-container">
        <div className="pagination-controls">
          <button
            onClick={() => {
              const prevPage = Math.max(currentPage - 1, 1);
              setCurrentPage(prevPage);
              setGoToPage(prevPage);
            }}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}{" "}
          </span>

          <button
            onClick={() => {
              const nextPage = Math.min(currentPage + 1, totalPages);
              setCurrentPage(nextPage);
              setGoToPage(nextPage);
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <div className="go-to-page-container">
          <input
            type="number"
            placeholder="Go To Page..."
            value={goToPage}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for Pokémon by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
            setGoToPage("");
          }}
        />
      </div>

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
    </>
  );
}

function PokemonCard({ id, name, onClick }) {
  const { data: pokemon, isPending, error } = useFetchPokemon(id);

  const [play, { stop }] = useSound(hoverSound, {
    volume: 0.5,
  });

  const timerRef = useRef(null);

  if (isPending) {
    return <div className="pokemon-card-container">Loading...</div>;
  }
  if (error) return "An error has occurred: " + error.message;

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
