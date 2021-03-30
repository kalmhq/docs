---
title: Install the Open Source Version
---

For getting started on localhost, make sure `kubectl` is installed and a minikube cluster is created before hand.

If you already have access to an existing cluster via `kubectl`, deploy Kalm via:

```shell
# clone the repo 
git clone https://github.com/kalmhq/kalm.git
cd kalm

# run the install script
./scripts/install-local-mode.sh
```

The whole process typically takes up to 5-10 minutes. Relax or check out our doc in the mean time.

Once the installation is complete, open a port to the web server.

```shell
kubectl port-forward -n kalm-system $(kubectl get pod -n kalm-system -l app=kalm -ojsonpath="{.items[0].metadata.name}") 3010:3010
```

Kalm should now be accessible at [http://localhost:3010](http://localhost:3010).