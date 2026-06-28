const express = require("express");
const cors = require("cors");
const os = require("os");
const k8s = require("@kubernetes/client-node");

const app = express();

app.use(cors());

let previousPodCount = 2;

const requestCounts = {};

// Kubernetes Config
const kc = new k8s.KubeConfig();

if (process.env.KUBERNETES_SERVICE_HOST) {
  kc.loadFromCluster();
} else {
  kc.loadFromDefault();
}

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const products = [
  { id: 1, name: "Laptop", price: 65000 },
  { id: 2, name: "Smartphone", price: 25000 },
  { id: 3, name: "Headphones", price: 3000 }
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

  const podName = os.hostname();

  if (!requestCounts[podName]) {
    requestCounts[podName] = 0;
  }

  requestCounts[podName]++;

  let sum = 0;

 for (let i = 0; i < 20000000; i++) {
    sum += Math.sqrt(i);
}
  res.json({
    message: "Analytics complete",
    pod: podName
  });

});

app.get("/metrics", async (req, res) => {

  try {

    const response = await k8sApi.listNamespacedPod("default");

    const pods = response.body.items
      .filter(
        pod =>
          pod.metadata &&
          pod.metadata.labels &&
          pod.metadata.labels.app === "techstore-backend"
      )
      .map(
        pod => pod.metadata.name
      );

    let scalingStatus = "Stable 🟢";

    if (pods.length > previousPodCount) {
      scalingStatus = "Scaling Up 🚀";
    }
    else if (pods.length < previousPodCount) {
      scalingStatus = "Scaling Down 📉";
    }

    previousPodCount = pods.length;

    res.json({
      activePods: pods.length,
      minPods: 2,
      maxPods: 10,
      cpuTarget: 20,
      status: "Healthy 🟢",
      scalingStatus,
      pods,
      loadDistribution: requestCounts
    });

  }
  catch (error) {

    console.error("Metrics Error:", error);

    res.status(500).json({
      error: error.message,
      details: error.body || error.response?.body || null
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});