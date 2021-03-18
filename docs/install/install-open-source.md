---
title: How to install the open-source version
---

# Prerequisites

- a Kubernetes cluster, check out [Kubernetes Setup](https://www.notion.so/Kubernetes-Setup-90ccfb21bd8344deb410be143f3864a2) for details
- make sure your `kubectl` is pointing at the right Kubernetes cluster

# Install Kalm using the default config

Clone the Kalm repo and run the script to install:

```bash
# clone the repo
git clone https://github.com/kalmhq/kalm.git
cd kalm

# run the install script
./scripts/install-local-mode.sh
```

The whole process typically takes up to 15-30 minutes.

Once the installation is complete, open a port to the web server.

```bash
kubectl port-forward -n kalm-system $(kubectl get pod -n kalm-system -l app=kalm -ojsonpath="{.items[0].metadata.name}") 3010:3010
```

Kalm should now be accessible at [http://localhost:3010](http://localhost:3010/).