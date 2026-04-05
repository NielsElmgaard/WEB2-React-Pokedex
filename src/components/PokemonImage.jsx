import { useState } from "react";

function PokemonImage({id}) {
  const [index, setIndex] = useState(0);
  const imgSources = [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/brilliant-diamond-shining-pearl/${id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ix/scarlet-violet/${id}.png`,
    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-VNUKqthEaH3XaAC1qmfuHrvjbXfaI33S-Q&s`,
  ];

  const handleError = () => {
    if (index < imgSources.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <img src={imgSources[index]} onError={handleError} alt={`Pokemon ${id}`} className="pokemon-img"/>
  );
}
export default PokemonImage;
