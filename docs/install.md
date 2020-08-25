---
title: Installation
---

## Compatibility

Kalm is optimized to work with the latest version of Kuberenetes (currently 1.18.x), and is backwards compatible down to 1.14.x

| Kalm version | k8s 1.14.x | k8s 1.15.x | k8s 1.16.x | k8s 1.17.x | k8s 1.18.x |
| ------------ | ---------- | ---------- | ---------- | ---------- | ---------- |
| 0.1.0        | ✔          | ✔          | ✔          | ✔          | ✔          |

<br />

## Step 1: Prerequisites

### Install Kubectl

Installation of Kalm requires kubectl, which can be installed according to the official <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/" target="_blank">Install and Set Up kubectl</a> docs.

### Cluster Setup (Minikube)

Kalm can be used to manage any kubernetes cluster. For the purpose of this tutorial, we recommend that you <a href="https://kubernetes.io/docs/tasks/tools/install-minikube/" target="_blank">install Minikube</a>, a single-node localhost cluster.

Once minikube is installed, create a new cluster via:

```
minikube start --memory 8192 --cpus 4
```

After the cluster starts, start the minikube tunnel in another terminal session via:

```
minikube tunnel
```

Alternatively, see the References sections for provisioning clusters on AWS and Google Cloud.

<br />

## Step 2: Install Kalm

Kalm can be installed as a [Kubernetes Operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) directly onto your cluster via:

```sh
curl -sL https://get.kalm.dev | bash
```

This command installs Kalm plus a few dependencies, and typically takes 3-5 minutes to complete. Relax in the mean time, or watch this short video on how Kalm works:

<figure class="video_container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/fzig4AvMr74" frameborder="0" allowfullscreen="true"></iframe>
</figure>

<br />

The installation script will give you real-time feedback of services spinning up. Once you see **Installation Complete**, move on to the next step.

## Step 3: Launch Webserver

To enable browser access, open a port via:

```sh
kubectl port-forward -n kalm-system \
  $(kubectl get pod -n kalm-system \
    -l app=kalm \
    -ojsonpath="{.items[0].metadata.name}") \
  3010:3010
```

Now open <a href="http://localhost:3010/" target="_blank">http://localhost:3010/</a>

![login screen](assets/main-page.png)

## Next Step

Congratulations! Kalm is now properly setup and running. Next, let's create our first application to see how Kalm works.
