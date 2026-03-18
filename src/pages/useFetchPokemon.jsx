import { useState, useEffect } from "react";

function useFetchPokemon(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);
  return [data];
}
export default useFetchPokemon;
