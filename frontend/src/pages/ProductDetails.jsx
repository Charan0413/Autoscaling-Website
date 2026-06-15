import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));

  }, [id]);

  if(!product){
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ₹{product.price}</p>
    </div>
  );
}

export default ProductDetails;