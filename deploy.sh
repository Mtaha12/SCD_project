#!/bin/bash

# Create MongoDB secret
kubectl create secret generic mongo-secret \
  --from-literal=uri="mongodb+srv://geo_user:geo_pass_123@cluster0.kuskxsb.mongodb.net/geo_news_db?retryWrites=true&w=majority&appName=Cluster0" \
  --dry-run=client -o yaml | kubectl apply -f -

# Apply Kubernetes manifests
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/backend-deployment
kubectl wait --for=condition=available --timeout=300s deployment/frontend-deployment

# Get the Minikube IP
MINIKUBE_IP=$(minikube ip)

echo "Deployment completed!"
echo "Frontend is available at: http://$MINIKUBE_IP:30000"
echo "Backend is available at: http://$MINIKUBE_IP:5000" 