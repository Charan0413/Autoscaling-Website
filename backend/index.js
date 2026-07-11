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
const customObjectsApi = kc.makeApiClient(k8s.CustomObjectsApi);
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

app.get("/analytics", async (req, res) => {

  const podName = os.hostname();

  requestCounts[podName] = (requestCounts[podName] || 0) + 1;

  let sum = 0;

  for (let round = 0; round < 5; round++) {

    for (let i = 0; i < 1000000; i++) {
      sum += Math.sqrt(i);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  res.json({
    message: "Analytics complete",
    pod: podName
  });

});

app.get("/metrics", async (req, res) => {

  try {

    // Get backend pods
    const response = await k8sApi.listNamespacedPod("default");

    const pods = response.body.items.filter(
      pod =>
        pod.metadata &&
        pod.metadata.labels &&
        pod.metadata.labels.app === "techstore-backend"
    );

    // Get CPU metrics
    const metricsResponse =
      await customObjectsApi.listNamespacedCustomObject(
        "metrics.k8s.io",
        "v1beta1",
        "default",
        "pods"
      );

    // Compatible with different client versions
    const metricItems =
      metricsResponse.body?.items ||
      metricsResponse.items ||
      [];

    const cpuPerPod = {};
    let totalCpu = 0;

    metricItems.forEach(metric => {

      if (
        metric.metadata.labels &&
        metric.metadata.labels.app === "techstore-backend"
      ) {

        const cpu = metric.containers[0].usage.cpu;

        let milliCpu = 0;

        if (cpu.endsWith("n")) {
          milliCpu = parseInt(cpu) / 1000000;
        }
        else if (cpu.endsWith("u")) {
          milliCpu = parseInt(cpu) / 1000;
        }
        else if (cpu.endsWith("m")) {
          milliCpu = parseInt(cpu);
        }
        else {
          milliCpu = parseFloat(cpu) * 1000;
        }

        milliCpu = Number(milliCpu.toFixed(2));

        cpuPerPod[metric.metadata.name] = milliCpu;

        totalCpu += milliCpu;

      }

    });
    console.dir(metricItems, { depth: null });

    const averageCpu =
      Object.keys(cpuPerPod).length === 0
        ? 0
        : Number(
            (
              totalCpu /
              Object.keys(cpuPerPod).length
            ).toFixed(2)
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

      pods: pods.map(p => p.metadata.name),

      loadDistribution: requestCounts,

      cpuPerPod,

      averageCpu

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