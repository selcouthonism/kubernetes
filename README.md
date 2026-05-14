# Kubernetes Project

This repository is a comprehensive hands-on Kubernetes learning project designed for software engineers, DevOps engineers, backend developers, and cloud practitioners who want to understand Kubernetes from fundamentals to advanced production concepts.

The project demonstrates Kubernetes architecture, workloads, networking, storage, configuration management, scaling, security, observability, and microservice deployments using practical YAML manifests and real-world examples.

The repository is structured into multiple modules, where each module focuses on a specific Kubernetes topic and includes practical examples, YAML configurations, commands, and deployment scenarios.

---

# Project Goals

- Learn Kubernetes fundamentals step by step
- Understand Kubernetes architecture and core components
- Practice deploying applications into Kubernetes clusters
- Explore networking, storage, scaling, and security concepts
- Understand production-grade Kubernetes patterns
- Gain hands-on experience for real-world projects and technical interviews
- Build foundational knowledge for Kubernetes certifications (CKA, CKAD, CKS)

---

# Technologies

- Kubernetes
- kubectl
- Docker
- Minikube / Kubernetes Cluster
- YAML
- Nginx
- Node.js
- MongoDB
- Express.js
- Linux Shell Scripts

---

# Repository Structure

## 01-module

Introduces Kubernetes fundamentals and architecture.

### Topics Covered
- What Kubernetes is
- Why Kubernetes is needed
- Container orchestration concepts
- Kubernetes cluster architecture
- Control Plane components
- Worker Node components
- Pods and basic Kubernetes objects
- kubectl basics

### Purpose
Provides the foundational knowledge required before working with Kubernetes workloads and services.

---

## 02-module

Focuses on Kubernetes workloads and deployment management.

### Topics Covered
- Pods
- ReplicaSets
- Deployments
- Rolling updates
- Rollbacks
- Scaling applications
- Declarative resource management
- YAML manifests

### Purpose
Demonstrates how Kubernetes manages containerized applications and ensures high availability.

---

## 03-module

Covers Kubernetes Services and networking.

### Topics Covered
- ClusterIP Services
- NodePort Services
- LoadBalancer Services
- Service discovery
- DNS inside Kubernetes
- Internal and external communication
- Networking concepts

### Purpose
Explains how applications communicate within a cluster and how external traffic reaches Kubernetes workloads.

---

## 04-module

Introduces configuration and secret management.

### Topics Covered
- ConfigMaps
- Secrets
- Environment variables
- Injecting configuration into containers
- Managing sensitive information
- Application configuration strategies

### Purpose
Demonstrates best practices for separating configuration from application code.

---

## 05-module

Focuses on Kubernetes storage concepts.

### Topics Covered
- Volumes
- Persistent Volumes (PV)
- Persistent Volume Claims (PVC)
- Stateful application storage
- Data persistence
- Storage lifecycle

### Purpose
Explains how Kubernetes manages persistent data for containerized applications.

---

## 06-module

Demonstrates advanced application deployment patterns and ingress management.

### Topics Covered
- Ingress
- Reverse proxy concepts
- Traffic routing
- Nginx Ingress Controller
- Path-based routing
- Host-based routing
- External access management

### Purpose
Shows how production-grade traffic routing and API exposure are handled in Kubernetes.

---

## 07-module

Focuses on scaling, resource management, and reliability.

### Topics Covered
- Horizontal Pod Autoscaler (HPA)
- Resource requests and limits
- CPU and memory management
- Self-healing capabilities
- Health checks
- Liveness probes
- Readiness probes

### Purpose
Demonstrates how Kubernetes automatically scales and maintains healthy applications.

---

## 08-module

Covers observability, security, and production best practices.

### Topics Covered
- Logging
- Monitoring concepts
- Kubernetes security fundamentals
- RBAC
- Namespaces
- Production deployment practices
- Troubleshooting strategies

### Purpose
Introduces important operational and security concepts required in real-world Kubernetes environments.

---

# app Directory

The `app` directory contains sample applications used throughout the modules for Kubernetes deployments and demonstrations.

These applications are used to demonstrate:
- Container deployments
- Service communication
- Scaling
- Persistent storage
- Configuration management
- Networking
- Ingress routing

---

# How to Use This Repository

## Prerequisites

Install the following tools:
- Docker
- kubectl
- Minikube (or another Kubernetes distribution)

---

## Start Kubernetes Cluster

```bash
minikube start
```

---

# Useful Kubernetes Commands

## Apply Kubernetes Resources

```bash
kubectl apply -f <file-name>.yaml
```

## Verify Resources

```bash
kubectl get all
```

## View Pods

```bash
kubectl get pods
```

## View Services

```bash
kubectl get svc
```

## Describe Resources

```bash
kubectl describe pod <pod-name>
```

## View Logs

```bash
kubectl logs <pod-name>
```

## Delete Resources

```bash
kubectl delete -f <file-name>.yaml
```

---

# Learning Outcomes

After completing this repository, you will understand:

- Kubernetes architecture
- Deploying applications into Kubernetes
- Scaling and managing workloads
- Kubernetes networking and ingress
- Persistent storage concepts
- Configuration and secret management
- Resource optimization
- Health monitoring and self-healing
- Security and RBAC fundamentals
- Production deployment patterns

---

# License

This project is licensed under the Apache-2.0 License.
