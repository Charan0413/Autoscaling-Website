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
              cpu: data.averageCpuPercent
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

  const podData = Object.entries(metrics.cpuPercentPerPod || {}).map(
    ([name, cpu]) => ({
      name: name.substring(name.length - 6),
      cpu
    })
  );

  return (
    <div className="page">

      <h1 className="section-title">
        Kubernetes Auto Scaling Dashboard
      </h1>

      <div className="stats">

        <div className="stat-card">
          <h2>{metrics.activePods}</h2>
          <p>Active Pods</p>
        </div>

        <div className="stat-card">
          <h2>{metrics.averageCpuPercent}%</h2>
          <p>Average CPU Utilization</p>
        </div>

        <div className="stat-card">
          <h2>{metrics.cpuTarget}%</h2>
          <p>CPU Target</p>
        </div>

        <div className="stat-card">
          <h2>{metrics.scalingStatus}</h2>
          <p>Status</p>
        </div>

      </div>

      <button
        className="analytics-button"
        onClick={runAnalytics}
      >
        Run Analytics
      </button>

      <div className="card">

        <h2 className="section-title">
          Average CPU Utilization
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={history}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              stroke="#CBD5E1"
            />

            <YAxis
              domain={[0, 100]}
              unit="%"
              stroke="#CBD5E1"
            />

            <Tooltip
              formatter={(value) => `${value}%`}
              contentStyle={{
                background: "#111827",
                border: "1px solid #334155",
                color: "#fff"
              }}
            />

            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="card" style={{ marginTop: "30px" }}>

        <h2 className="section-title">
          CPU Utilization Per Pod
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={podData}>

            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              stroke="#CBD5E1"
            />

            <YAxis
              domain={[0, 100]}
              unit="%"
              stroke="#CBD5E1"
            />

            <Tooltip
              formatter={(value) => `${value}%`}
              contentStyle={{
                background: "#111827",
                border: "1px solid #334155",
                color: "#fff"
              }}
            />

            <Bar
              dataKey="cpu"
              fill="#22C55E"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Analytics;