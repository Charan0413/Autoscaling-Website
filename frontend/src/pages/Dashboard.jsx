import { useEffect, useState } from "react";
import { API_URL } from "../config";

function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = () => {
      fetch(`${API_URL}/metrics`)
        .then((res) => res.json())
        .then((data) => setMetrics(data))
        .catch((err) => console.error(err));
    };

    fetchMetrics();

    const interval = setInterval(fetchMetrics, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <h1>Kubernetes Dashboard 🚀</h1>
        <p>Live Auto Scaling Monitoring</p>
      </div>

      {/* METRICS */}
      <div className="stats">

        <div className="stat-card">
          <h2>{metrics.activePods}</h2>
          <p>Active Pods</p>
        </div>

        <div className="stat-card">
          <h2>{metrics.minPods}</h2>
          <p>Minimum Pods</p>
        </div>

        <div className="stat-card">
          <h2>{metrics.maxPods}</h2>
          <p>Maximum Pods</p>
        </div>

        <div className="stat-card">
          <h2>{metrics.scalingStatus}</h2>
          <p>Scaling Status</p>
        </div>

        <div className="stat-card">
          <h2 className="status-green">
            {metrics.status}
          </h2>
          <p>Status</p>
        </div>

        <div className="stat-card">
          <h2>
            {Object.values(metrics.loadDistribution || {})
              .reduce((a, b) => a + b, 0)}
          </h2>
          <p>Total Requests</p>
        </div>

      </div>

      {/* RUNNING PODS */}
      <h2 className="section-title">
        Running Pods
      </h2>

      <div className="card">
        {metrics.pods && metrics.pods.map((pod) => (
          <div key={pod} style={{ marginBottom: "10px" }}>
            🚀 {pod}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;