import useFetchPokemon from "../hooks/useFetchPokemon.jsx";
import PokemonImage from "../components/PokemonImage.jsx";
import pokemonCardColorless from "../assets/pokemon-cards/pokemon-card-colorless.png";
import pokemonCardDarkness from "../assets/pokemon-cards/pokemon-card-darkness.png";
import pokemonCardDragon from "../assets/pokemon-cards/pokemon-card-dragon.png";
import pokemonCardFairy from "../assets/pokemon-cards/pokemon-card-fairy.png";
import pokemonCardFighting from "../assets/pokemon-cards/pokemon-card-fighting.png";
import pokemonCardFire from "../assets/pokemon-cards/pokemon-card-fire.png";
import pokemonCardGrass from "../assets/pokemon-cards/pokemon-card-grass.png";
import pokemonCardLightning from "../assets/pokemon-cards/pokemon-card-lightning.png";
import pokemonCardMetal from "../assets/pokemon-cards/pokemon-card-metal.png";
import pokemonCardPsychic from "../assets/pokemon-cards/pokemon-card-psychic.png";
import pokemonCardWater from "../assets/pokemon-cards/pokemon-card-water.png";

import pokemonBackgroundLandscape from "../assets/pokemon-cards/pokemon-display-background-landscape.png";

function PokemonDisplay({ selectedPokemon }) {
  const parts = selectedPokemon.url.split("/");
  const id = parts[parts.length - 2];

  const { data: pokemonDetails, isPending, error } = useFetchPokemon(id);

  const type = pokemonDetails?.types?.[0]?.type?.name || "normal";

  const hp = pokemonDetails?.stats?.find(
    (s) => s.stat.name === "hp",
  )?.base_stat;
  const attack = pokemonDetails?.stats?.find(
    (s) => s.stat.name === "attack",
  )?.base_stat;
  const defense = pokemonDetails?.stats?.find(
    (s) => s.stat.name === "defense",
  )?.base_stat;
  const specialAttack = pokemonDetails?.stats?.find(
    (s) => s.stat.name === "special-attack",
  )?.base_stat;
  const specialDefense = pokemonDetails?.stats?.find(
    (s) => s.stat.name === "special-defense",
  )?.base_stat;
  const speed = pokemonDetails?.stats?.find(
    (s) => s.stat.name === "speed",
  )?.base_stat;

  return (
    <div className="pokemon-card-display">
      <img fetchpriority="high"
        src={getPokemonTypeBackgroundImage(type)}
        className="pokemon-card-background"
      />
      <img fetchpriority="high"
        src={pokemonBackgroundLandscape}
        className="pokemon-card-background-landscape"
      />

      <h1 className="pokemon-display-name">{pokemonDetails?.name}</h1>
      <div className="pokemon-display-image">
        <PokemonImage id={id} />
      </div>
      <div className="pokemon-display-hp-stat">
        <span className="hp-label">HP</span>
        <span className="hp-value">{hp}</span>
      </div>
    </div>
  );
}

function getPokemonTypeBackgroundImage(type) {
  const energyType = {
    normal: pokemonCardColorless,
    fire: pokemonCardFire,
    water: pokemonCardWater,
    electric: pokemonCardLightning,
    grass: pokemonCardGrass,
    ice: pokemonCardWater,
    fighting: pokemonCardFighting,
    poison: pokemonCardDarkness,
    ground: pokemonCardFighting,
    flying: pokemonCardColorless,
    psychic: pokemonCardPsychic,
    bug: pokemonCardGrass,
    rock: pokemonCardFighting,
    ghost: pokemonCardPsychic,
    dragon: pokemonCardDragon,
    dark: pokemonCardDarkness,
    steel: pokemonCardMetal,
    fairy: pokemonCardFairy,
  };

  return energyType[type] || energyType.normal;
}

export default PokemonDisplay;
