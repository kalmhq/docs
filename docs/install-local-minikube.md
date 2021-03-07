---
title: "Install Kalm On Minikube"
---

## Install Minikube

If you are using minikube for the first time, please open its [official website](https://minikube.sigs.k8s.io/docs/start/) to get basic information about minikube and go through the official documentation to install it.

```
❯ minikube version
minikube version: v1.17.1
commit: 043bdca07e54ab6e4fc0457e3064048f34133d7e
```

## Create a new cluster

```
❯ minikube start --memory 4096 --cpus 4  --kubernetes-version v1.18.0
😄  minikube v1.17.1 on Darwin 11.2.1
🆕  Kubernetes 1.20.2 is now available. If you would like to upgrade, specify: --kubernetes-version=v1.20.2
✨  Using the hyperkit driver based on existing profile
👍  Starting control plane node minikube in cluster minikube
🔄  Restarting existing hyperkit VM for "minikube" ....
💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
🐳  Preparing Kubernetes v1.18.0 on Docker 20.10.2 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔎  Verifying Kubernetes components...
🌟  Enabled addons: storage-provisioner, default-storageclass

❗  /usr/local/bin/kubectl is version 1.20.4, which may have incompatibilites with Kubernetes 1.18.0.
    ▪ Want kubectl v1.18.0? Try 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

```

If you have network issues, please configure a proxy: [Minikube Proxy](https://minikube.sigs.k8s.io/docs/reference/networking/proxy/)
And your install log will be like this:

```
❯ minikube start --memory 4096 --cpus 4  --kubernetes-version v1.18.0
😄  minikube v1.17.1 on Darwin 11.2.1
🆕  Kubernetes 1.20.2 is now available. If you would like to upgrade, specify: --kubernetes-version=v1.20.2
✨  Using the hyperkit driver based on existing profile
❗  Local proxy ignored: not passing HTTP_PROXY=http://127.0.0.1:1087 to docker env.
❗  Local proxy ignored: not passing HTTPS_PROXY=http://127.0.0.1:1087 to docker env.
👍  Starting control plane node minikube in cluster minikube
🔄  Restarting existing hyperkit VM for "minikube" ...
❗  Local proxy ignored: not passing HTTP_PROXY=http://127.0.0.1:1087 to docker env.
❗  Local proxy ignored: not passing HTTPS_PROXY=http://127.0.0.1:1087 to docker env.
🌐  Found network options:
    ▪ http_proxy=http://127.0.0.1:1087
❗  You appear to be using a proxy, but your NO_PROXY environment does not include the minikube IP (192.168.64.12).
📘  Please see https://minikube.sigs.k8s.io/docs/handbook/vpn_and_proxy/ for more details
    ▪ https_proxy=http://127.0.0.1:1087
❗  This VM is having trouble accessing https://k8s.gcr.io
💡  To pull new external images, you may need to configure a proxy: https://minikube.sigs.k8s.io/docs/reference/networking/proxy/
🐳  Preparing Kubernetes v1.18.0 on Docker 20.10.2 ...
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔎  Verifying Kubernetes components...
🌟  Enabled addons: storage-provisioner, default-storageclass

❗  /usr/local/bin/kubectl is version 1.20.4, which may have incompatibilites with Kubernetes 1.18.0.
    ▪ Want kubectl v1.18.0? Try 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

```

After cluster running, you can check status by following command:

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
