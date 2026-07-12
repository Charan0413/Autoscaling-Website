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
    <div className="page">

      <div className="hero">
        <h1>Kubernetes Dashboard</h1>
        <p>Real-Time Monitoring of Kubernetes Auto Scaling</p>
      </div>

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
          <p>Cluster Status</p>
        </div>

        <div className="stat-card">
          <h2>
            {Object.values(metrics.loadDistribution || {}).reduce(
              (a, b) => a + b,
              0
            )}
          </h2>
          <p>Total Requests</p>
        </div>

      </div>

      <div className="card">

        <h2 className="section-title">
          Running Pods
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          {metrics.pods &&
            metrics.pods.map((pod) => (
              <div
                key={pod}
                style={{
                  padding: "12px 16px",
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                  fontFamily: "monospace"
                }}
              >
                {pod}
              </div>
            ))}
        </div>

      </div>

    </div>
  );
}

export default Dashboard;