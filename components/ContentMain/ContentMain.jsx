import { useEffect, useState } from "react";
import Post from "../Post/Post";

export default function ContentMain() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  const getProducts = async () => {
    await fetch(
      `https://5eed24da4cbc340016330f0d.mockapi.io/api/articles?filter=${filter}`
    )
      .then((response) => response.json())
      .then((response) => setProducts(response))
      .catch((error) => error);
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    getProducts();
  }, [filter]);

  return (
    <section className="contentMain">
      <div className="container">
        <div>
          <h2 className="title">Login </h2>
        </div>
      </div>
    </section>
  );
}
