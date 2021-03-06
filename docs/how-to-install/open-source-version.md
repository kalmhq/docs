---
title: Install The Open Source Version
---

To get Kalm running on your localhost, make sure your have `kubectl` installed and you've setup a [minikube](https://minikube.sigs.k8s.io/docs/start/) cluster.

Once you have `kubectl` configured to your minikube cluster, you can deploy Kalm with the following commands:

```shell
# clone the repo 
git clone https://github.com/kalmhq/kalm.git
cd kalm

# run the install script
./scripts/install-local-mode.sh
```

This whole process typically takes around 5-10 minutes. Relax or check out our docs in the mean time.

Once the installation is complete, run the following command to open a port to the web server:

```shell
kubectl port-forward -n kalm-system $(kubectl get pod -n kalm-system -l app=kalm -ojsonpath="{.items[0].metadata.name}") 3010:3010
```

Your freshly installed Kalm should now be accessible at [http://localhost:3010](http://localhost:3010).
