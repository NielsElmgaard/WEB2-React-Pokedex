import { useState, useEffect } from "react";

function useFetchAll(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.results));
  }, [url]);
  return [data];
}
export default useFetchAll;
