function Analytics() {
  const runAnalytics = async () => {
    const response = await fetch("http://localhost:5000/analytics");
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="card">
      <h1>Analytics Dashboard</h1>

      <button onClick={runAnalytics}>
        Run Analytics
      </button>
    </div>
  );
}

export default Analytics;