import { useEffect, useState } from "react";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data));

  }, []);

  return (
    <div>

      <h1>Products</h1>

      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}

    </div>
  );
}

export default Products;