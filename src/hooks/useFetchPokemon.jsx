import { useState, useEffect } from "react";

async function useFetchPokemon(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);
  return [data];
}
export default useFetchPokemon;
