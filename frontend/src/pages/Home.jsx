import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 4)));
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero">

        <h1>Welcome to TechStore</h1>

    

        <Link
          to="/products"
          className="hero-button"
        >
          Browse Products
        </Link>

      </div>

      {/* FEATURED PRODUCTS */}

      <h2 className="section-title">
        Featured Products
      </h2>

      <div className="product-grid">

        {products.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

            <div className="product-image-placeholder">

  {product.name === "Laptop" && "💻"}

  {product.name === "Smartphone" && "📱"}

  {product.name === "Headphones" && "🎧"}

</div>

            <h3 className="product-title">
              {product.name}
            </h3>

            <p className="product-price">
              ₹{product.price}
            </p>

            <Link
              className="product-link"
              to={`/products/${product.id}`}
            >
              View Details
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;