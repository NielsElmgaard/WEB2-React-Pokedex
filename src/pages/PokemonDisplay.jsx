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

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

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

  const maxStatValue = 200;

  const getStatColor = (value) => {
    switch (true) {
      case value < 30:
        return "#F34444";
      case value < 60:
        return "#FF7F0F";
      case value < 90:
        return "#FFDD57";
      case value < 120:
        return "#A0E515";
      case value < 150:
        return "#23CD5E";
      default:
        return "#00C2B8";
    }
  };

  const OtherStatsRow = ({ label, value, max }) => {
    return (
      <div className="stat-row">
        <div className="other-stats-label-container">
          <span className="stat-name">{label}</span>
          <span className="stat-number">{value}</span>
        </div>

        <div className="stat-bar-container">
          <div
            className="stat-bar"
            style={{
              width: `${Math.min((value / max) * 100, 100)}%`,
              backgroundColor: getStatColor(value),
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="pokemon-card-display">
        <img
          src={getPokemonTypeBackgroundImage(type)}
          className="pokemon-card-background"
        />
        <img
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
        <div className="pokemon-display-other-stats">
          <h2 id="stats-header">
            <u>Stats</u>
          </h2>
          <OtherStatsRow label={"ATK"} value={attack} max={maxStatValue} />
          <OtherStatsRow
            label={"SP.ATK"}
            value={specialAttack}
            max={maxStatValue}
          />
          <OtherStatsRow
            label={"SP.DEF"}
            value={specialDefense}
            max={maxStatValue}
          />
          <OtherStatsRow label={"SPD"} value={speed} max={maxStatValue} />
        </div>
      </div>
    </>
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
