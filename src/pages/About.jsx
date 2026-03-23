import pokemonVideo from "../assets/pokemon-intro.mp4";

function About() {
  return (
    <video width="422" height="750" autoPlay loop>
      <source src={pokemonVideo} type="video/mp4" />
    </video>
  );
}

export default About;
