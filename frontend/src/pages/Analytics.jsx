import { API_URL } from "../config";
function Analytics() {
  const runAnalytics = async () => {
    try {
      const response = await fetch(`${API_URL}/analytics`);

      if (!response.ok) {
        throw new Error("Failed to run analytics");
      }

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Error running analytics");
    }
  };

  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero">
        <h1>Analytics Dashboard 📊</h1>
        <p>
          Simulate high CPU workloads to demonstrate Kubernetes auto-scaling
        </p>
      </div>


      {/* ANALYTICS CARD */}
      <div className="analytics-card">

        <div className="analytics-icon">
          📈
        </div>

        <h2>CPU Intensive Analytics</h2>

        <p className="analytics-description">
          Clicking the button below executes a computationally heavy task
          designed to increase CPU usage and trigger Kubernetes Horizontal
          Pod Autoscaling.
        </p>

        <button
          className="analytics-button"
          onClick={runAnalytics}
        >
          Run Analytics
        </button>

      </div>

    </div>
  );
}

export default Analytics;