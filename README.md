# TechStore – Kubernetes Auto-Scaling E-Commerce Platform

A cloud-native e-commerce application built using the MERN stack principles and deployed on Kubernetes. The project demonstrates automatic horizontal scaling based on CPU utilization while providing a real-time monitoring dashboard for cluster activity.

---

## Overview

TechStore is a simple e-commerce application designed to demonstrate Kubernetes Horizontal Pod Autoscaling (HPA). The backend is containerized using Docker and deployed on Kubernetes with CPU-based auto scaling. The frontend provides a real-time dashboard showing pod information, CPU utilization, and scaling behavior.

This project focuses on cloud-native deployment, monitoring, and scalability rather than complex business logic.

---

## Features

- Product listing and product details
- Real-time Kubernetes monitoring
- CPU-based Horizontal Pod Autoscaler (HPA)
- Automatic pod scaling under load
- Live CPU utilization charts
- Per-pod CPU utilization monitoring
- Request load distribution tracking
- Dockerized backend
- Kubernetes Deployment, Service and HPA configuration
- Responsive React frontend

---

## Tech Stack

### Frontend
- React
- React Router
- Recharts
- CSS

### Backend
- Node.js
- Express.js
- Kubernetes JavaScript Client

### DevOps & Cloud
- Docker
- Kubernetes
- Metrics Server
- Horizontal Pod Autoscaler (HPA)
- ApacheBench (Load Testing)
- Minikube

---

## Project Architecture

```
                 ApacheBench
                      │
                      ▼
              Kubernetes Service
                      │
      ┌───────────────┴───────────────┐
      ▼                               ▼
 Backend Pod 1                  Backend Pod 2
      │                               │
      └───────────────┬───────────────┘
                      │
             Kubernetes Deployment
                      │
                Horizontal Pod Autoscaler
                      │
                Metrics Server
                      │
                  CPU Utilization
```

---

## Folder Structure

```
TechStore/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── kubernetes/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   └── metrics-rbac.yaml
│
└── README.md
```

---

## How Auto Scaling Works

1. User requests are sent to the `/analytics` endpoint.
2. The endpoint performs CPU-intensive computation.
3. CPU utilization increases.
4. Kubernetes Metrics Server collects CPU metrics.
5. Horizontal Pod Autoscaler continuously monitors CPU utilization.
6. When CPU utilization exceeds the configured threshold, Kubernetes automatically creates additional pods.
7. As traffic decreases, Kubernetes scales the deployment back down to the minimum number of replicas.

---

## Dashboard Features

### Dashboard
- Active Pods
- Minimum Pods
- Maximum Pods
- Scaling Status
- Cluster Status
- Running Pods

### Analytics
- Average CPU Utilization
- CPU Utilization Per Pod
- Live CPU Utilization Graph
- Real-time Metrics Updates
- Trigger Load Testing

---

## Load Testing

ApacheBench was used to generate concurrent requests and observe automatic scaling.

Example:

```bash
ab -n 1000 -c 50 http://<SERVICE_IP>/analytics
```

During testing:

- CPU utilization increases
- New pods are automatically created
- Traffic gets distributed across pods
- Pods scale back down after the load decreases

---

## Kubernetes Resources

- Deployment
- Service
- Horizontal Pod Autoscaler
- Metrics Server
- RBAC for Metrics API

---

## Screenshots

### Home Page

(Add Screenshot)

### Products Page

(Add Screenshot)

### Analytics Dashboard

(Add Screenshot)

### Kubernetes Dashboard

(Add Screenshot)

### HPA Scaling

(Add Screenshot)

---

## Future Improvements

- Authentication
- Shopping Cart
- MongoDB Integration
- Order Management
- Prometheus Monitoring
- Grafana Dashboard
- Helm Charts
- CI/CD Pipeline using GitHub Actions
- Deployment on AWS EKS or Azure AKS

---

## Learning Outcomes

This project helped me gain practical experience with:

- React.js
- Express.js
- REST APIs
- Docker
- Kubernetes
- Horizontal Pod Autoscaler
- Metrics Server
- Resource Requests & Limits
- CPU-based Auto Scaling
- Kubernetes RBAC
- ApacheBench Load Testing
- Real-time Monitoring

---

## Author

**Sricharan**

B.Tech – Computer Science & Cybersecurity

GitHub: Charan0413

LinkedIn: Sricharan Gavati

---

## License

This project is intended for educational and learning purposes.