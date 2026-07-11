import { useState, useEffect } from "react";
import { API_URL } from "../config";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

function Analytics() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);

  const runAnalytics = async () => {
    try {
      const res = await fetch(`${API_URL}/analytics`);

      const data = await res.json();

      alert(`Analytics completed on ${data.pod}`);
    } catch {
      alert("Analytics Failed");
    }
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${API_URL}/metrics`);
        const data = await res.json();

        setMetrics(data);

        setHistory((prev) => {
          const updated = [
            ...prev,
            {
              time: new Date().toLocaleTimeString(),
              cpu: data.averageCpu
            }
          ];

          return updated.slice(-20);
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchMetrics();

    const interval = setInterval(fetchMetrics, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return <h2>Loading...</h2>;
  }

  const podData = Object.entries(metrics.cpuPerPod).map(([name, cpu]) => ({
    name: name.substring(name.length - 6),
    cpu
  }));

  return (
    <div style={{ padding: "30px" }}>

      <h1>Kubernetes Auto Scaling Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "30px"
        }}
      >
        <div className="stat-card">
          <h2>{metrics.activePods}</h2>
          <p>Active Pods</p>
        </div>

        <div className="stat-card">
          <h2>{metrics.averageCpu} m</h2>
          <p>Average CPU</p>
        </div>

        <div className="stat-card">
          <h2>{metrics.cpuTarget}%</h2>
          <p>CPU Target</p>
        </div>

        <div className="stat-card">
          <h2>{metrics.scalingStatus}</h2>
        </div>
      </div>

      <button
        className="analytics-button"
        onClick={runAnalytics}
      >
        Run Analytics
      </button>

      <h2 style={{ marginTop: "50px" }}>
        Average CPU Usage
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#8884d8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

      <h2 style={{ marginTop: "50px" }}>
        CPU Per Pod
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={podData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="cpu"
            fill="#82ca9d"
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default Analytics;