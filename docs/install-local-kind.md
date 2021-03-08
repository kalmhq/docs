---
title: "Install Kalm on Kind"
---

## Install Kind

Kind is a tool for running local Kubernetes clusters using Docker container “nodes”. If you are using Kind for the first time, please checkout its [official website](https://kind.sigs.k8s.io/docs/user/quick-start/) to get basic information and go through their installation process.

```
brew install kind
```

## Create a new cluster

```
❯ kind create cluster
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.20.2) 🖼
 ✓ Preparing nodes 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-kind"
You can now use your cluster with:

kubectl cluster-info --context kind-kind

Have a nice day! 👋

```

```
❯ kubectl get pods -A
dNAMESPACE            NAME                                         READY   STATUS    RESTARTS   AGE
kube-system          coredns-74ff55c5b-8x47r                      1/1     Running   0          64s
kube-system          coredns-74ff55c5b-v8qsl                      1/1     Running   0          64s
kube-system          etcd-kind-control-plane                      0/1     Running   0          66s
kube-system          kindnet-bcdxs                                1/1     Running   0          64s
kube-system          kube-apiserver-kind-control-plane            1/1     Running   0          66s
kube-system          kube-controller-manager-kind-control-plane   0/1     Running   0          66s
kube-system          kube-proxy-m8bff                             1/1     Running   0          64s
kube-system          kube-scheduler-kind-control-plane            0/1     Running   0          66s
local-path-storage   local-path-provisioner-78776bfc44-b8tq2      1/1     Running   0          64s
```

## Install Kalm

```
# clone the repo
git clone https://github.com/kalmhq/kalm.git
cd kalm
```

```
./scripts/install.sh $(git rev-parse HEAD)

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
