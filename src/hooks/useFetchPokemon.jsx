import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

function useFetchPokemon(id) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch pokémon");
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutter
  });
}
export default useFetchPokemon;
