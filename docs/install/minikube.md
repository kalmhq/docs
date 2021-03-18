---
title: Install Kalm on Minikube
---

## Overview

Minikube is a popular tool that quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows. While not frequently recommended for production environments, minikube is commonly used by developers to quickly test Kubernetes ideas locally. This guide will walk you through how to install and run Kalm on a local cluster created through minikube.

## Install Minikube

First you'll need have minikube installed. If you don't already have it installed, follow [the official minikube documentation](https://minikube.sigs.k8s.io/docs/start/) to install it on your OS.

You can try running the `minikube version` command to confirm installation.

```
❯ minikube version

minikube version: v1.17.1
commit: 043bdca07e54ab6e4fc0457e3064048f34133d7e
```

## Create a New Cluster

Use minikube to create a new local cluster using the `minikube start` command. We recommend initializing a cluster with the settings below.

```
❯ minikube start --memory 4096 --cpus 4  --kubernetes-version v1.18.0
```

*Note - if you're experiencing networking issues, consider configuring a proxy: [Minikube Proxy](https://minikube.sigs.k8s.io/docs/reference/networking/proxy/)*

After your minikube cluster is up and running, you can use the `minikube status` command to see some basic details:

```
❯ minikube status

minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
timeToStop: Nonexistent
```

## Install Kalm on Your Minikube Cluster

With a minikube cluster up and running, you can install Kalm by running our install script.

First, clone the Kalm git repository:

```
# clone the repo
git clone https://github.com/kalmhq/kalm.git
cd kalm
```

Next, run the install script to install Kalm:

```bash
./scripts/install-local-mode.sh
```

The installation log should be similar as this:

```bash
Initializing Kalm - 4/4 modules ready:

✔ kalm-operator
✔ cert-manager
✔ istio-system
✔ kalm-system
Kalm Installation Complete! 🎉

To start using Kalm, open a port via:

kubectl port-forward -n kalm-system $(kubectl get pod -n kalm-system -l app=kalm -ojsonpath="{.items[0].metadata.name}") 3010:3010

Then visit http://localhost:3010 in your browser
```

Once the installation is complete, your can access the dashboard using port-forward:

```bash
kubectl port-forward -n kalm-system $(kubectl get pod -n kalm-system -l app=kalm -ojsonpath="{.items[0].metadata.name}") 3010:3010
```

Then visit [http://localhost:3010](http://localhost:3010) to check out the dashboard.%