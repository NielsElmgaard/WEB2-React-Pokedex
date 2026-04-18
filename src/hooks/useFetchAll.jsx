import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function useFetchAll() {
  return useQuery({
    queryKey: ["pokemonData"],
    queryFn: async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1350");
      if (!res.ok) {
        throw new Error("Failed to fetch Pokémon data");
      }
      const json = await res.json()
      return json.results;
    },
    staleTime: 1000 * 60 * 60,
  });
}

export default useFetchAll;
