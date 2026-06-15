const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 65000
  },
  {
    id: 2,
    name: "Smartphone",
    price: 25000
  },
  {
    id: 3,
    name: "Headphones",
    price: 3000
  }
];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to TechStore"
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {

  const product = products.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);

});

app.get("/analytics", (req, res) => {

  let total = 0;

  for(let i = 0; i < 1000000000; i++) {
    total += Math.sqrt(i);
  }

  res.json({
    message: "Analytics Completed",
    total
  });

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});