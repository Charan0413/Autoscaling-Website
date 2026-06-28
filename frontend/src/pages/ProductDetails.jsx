import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../config";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
   fetch(`${API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="card">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>

      {/* HERO */}
      <div className="hero">
        <h1>Product Details 📦</h1>
        <p>Explore detailed information about the product</p>
      </div>

      {/* PRODUCT CARD */}
      <div className="details-card">

        <div className="details-image">
          {product.name === "Laptop" && "💻"}
          {product.name === "Smartphone" && "📱"}
          {product.name === "Headphones" && "🎧"}
        </div>

        <div className="details-info">
          <h1>{product.name}</h1>

          <h2 className="details-price">
            ₹{product.price}
          </h2>

          <p className="details-description">
            High-quality electronic product available exclusively on TechStore.
            Built for performance and reliability.
          </p>

          <button>
            Add to Cart
          </button>

          <Link className="back-button" to="/products">
            ← Back to Products
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;