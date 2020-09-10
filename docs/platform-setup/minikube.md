---
title: Install on Minikube
---

The simplest way to provision a localhost cluster is minikube.

## Step 1: Install minikube

Please follow [minikube official document](https://kubernetes.io/docs/tasks/tools/install-minikube/) to install minikube.

## Step 2: Start a minikube cluster

It recommended to use 8G memory and 4 core cpu to test kalm with. Adjust resources base on your environment.

```bash
minikube start --memory 8192 --cpus 4
```

After the cluster is up and running. Open a new terminal and type the following command. You may be prompted to enter your password. It will create a route to services deployed with type LoadBalancer and sets their Ingress to their ClusterIP.

```bash
minikube tunnel
```

## Step 2: Install Kalm

Once the cluster is setup, install Kalm with the following command.

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

Now open http://localhost:3010/

## Clean Up

Delete the cluster after test.

```
minikube delete
```

## Next Step

You've now setup Kalm on a minikube cluster. To get a sense of how Kalm works, see the [Hello Kalm](./tut-hello.md) tutorial.
