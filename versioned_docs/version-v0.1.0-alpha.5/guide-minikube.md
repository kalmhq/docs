---
title: Install on Minikube
---

The simplest way to provision a localhost cluster is through minikube.

## Step 1: Install minikube

Please follow the [minikube official documentation](https://kubernetes.io/docs/tasks/tools/install-minikube/) to install minikube.

## Step 2: Start a minikube cluster

It recommended to use 8G memory and 4 core cpu to test kalm with. You can always adjust resources based on your environment.

```bash
minikube start --memory 8192 --cpus 4
```

After the cluster is up and running. Open a new terminal and type the following command. _You may be prompted to enter your password._

```bash
minikube tunnel
```

This creates a route to services deployed with type LoadBalancer and sets their Ingress to their ClusterIP.

## Step 2: Install Kalm

Once the cluster is setup, install Kalm with the following command:

```bash
curl -sL https://get.kalm.dev | bash
```

To enable localhost access, open a port via:

```bash
kubectl port-forward -n kalm-system \
  $(kubectl get pod -n kalm-system \
    -l app=kalm \
    -ojsonpath="{.items[0].metadata.name}") \
  3010:3010
```

Now open http://localhost:3010/ - you can now play around with Kalm on your localhost cluster!

## Clean Up

Delete the cluster after you're finished testing.

```
minikube delete
```

## Next Step

You've now setup Kalm on a minikube cluster. To get a greater sense of how Kalm works, see the [Hello Kalm](./tut-hello.md) tutorial.
