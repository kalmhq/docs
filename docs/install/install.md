---
title: Installation
---

To install Kalm, you first need a Kubernetes cluster. You can either test Kalm on a local cluster or you can run it in the cloud using managed Kubernetes services such as EKS and GKE. Often, simplistic testing is done on local clusters while production environments are run in the cloud.

# Testing Kalm Locally

To quickly test out Kalm, you may run Kalm on "minified" versions of Kubernetes like minikube, k3s, and microk8s. Check out our minified how-to manuals:

[Install Kalm on Minikube](minikube)

[Install Kalm on k3s](https://docs.kalm.dev/install-local-k3s)

[Install Kalm on kind](https://docs.kalm.dev/install-local-kind)

# Kalm On The Cloud

For a more robust setups, you can install Kalm directly on EKS(Elastic Kubernetes Service) and GKE(Google Kubernetes Engine). To do so, you'll need to configure your cluster so that Kalm can install smoothly. We strongly recommend using the following guides when setting up Kalm on an EKS or GKE cluster:

[AWS Elastic Kubernetes Service](eks)

[Google Kubernetes Engine](gke)

# Install Kalm

Once you have a cluster ready, you can choose between installing Kalm-Cloud or the open source version. The Cloud version is recommended for most serious development, while the open source version is sufficient for hobbyists. The following guides walk you through each of these processes:

[How To Install Kalm Cloud](install-kalm-cloud)

[How to install the open-source version](install-open-source)

# Uninstalling Kalm

To uninstall Kalm from your cluster cleanly, use the following guide:

[Uninstall](uninstall)