import { useState, useEffect } from "react";

async function useFetchAll(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.results));
  }, [url]);
  return [data];
}
export default useFetchAll;
