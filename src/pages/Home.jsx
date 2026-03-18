import useFetchAll from "./useFetchAll.jsx";
import { useState } from "react";
import useFetchPokemon from "./useFetchPokemon.jsx";

function Home() {
  const [pokemons] = useFetchAll(
    "https://pokeapi.co/api/v2/pokemon?limit=1350",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil((pokemons?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = pokemons?.slice(startIndex, endIndex) || [];

  return (
    <>
      <div className="pokemon-container">
        {currentItems.map((pokemon) => {
          const parts = pokemon.url.split("/");
          const id = parts[parts.length - 2];
          return <PokemonCard key={id} id={id} name={pokemon.name} />;
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

function PokemonCard({ id, name }) {
  const [pokemon] = useFetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!pokemon) {
    return <div className="pokemon-card-container">Loading...</div>;
  }

  const type = pokemon?.types?.[0]?.type?.name || "normal";

  return (
    <div className="pokemon-card-container" style={getPokemonCardStyle(type)}>
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

function PokemonImage({ id }) {
  const [imgSrc, setImgSrc] = useState(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
  );
  const [isPng, setIsPng] = useState(false);

  const handleNotGif = () => {
    if (!isPng) {
      setImgSrc(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      );
      setIsPng(true);
    } else {
      setImgSrc(
        "https://t4.ftcdn.net/jpg/17/64/04/87/360_F_1764048718_QXL08Lw6o39Xcvu5X9r2qI0yH4onPB3p.jpg",
      );
    }
  };

  return (
    <img
      src={imgSrc}
      onError={handleNotGif}
      alt={`Pokemon ${id}`}
    />
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
