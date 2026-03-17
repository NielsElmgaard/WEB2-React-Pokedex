import "./App.css";
import { usePokemonsFetch } from "./usePokemonsFetch";
import { useState } from "react";

function App() {
  const [pokemons] = usePokemonsFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = pokemons.slice(startIndex, endIndex);

  return (
    <>
      <div className="pokemon-container">
        {currentItems.map((pokemon) => {
          const parts = pokemon.url.split("/");
          const id = parts[parts.length - 2];
          return (
            <div key={id} className="pokemon-card">
              <div className="pokemon">
              <PokemonImage id={id} />
              <PokemonInfo name={pokemon.name} />
              </div>
            </div>
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

function PokemonImage({ id }) {
  return (
    <img
      className="pokeImg"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      alt={id}
    />
  );
}

function PokemonInfo({ name }) {
  return <h1 className="pokeName">{name}</h1>;
}

export default App;
