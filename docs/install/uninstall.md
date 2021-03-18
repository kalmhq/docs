---
title: Uninstall
---

## Uninstall Kalm

To remove core components of Kalm, run the uninstall script

```bash
# rm kalm-operator
kubectl delete --ignore-not-found=true -f https://raw.githubusercontent.com/kalmhq/kalm/main/kalm-install-operator.yaml

# rm kalm core
kubectl delete --ignore-not-found=true -f https://raw.githubusercontent.com/kalmhq/kalm/main/kalm.yaml
```

It is safe to ignore errors for non-existent resources because they may have been deleted hierarchically.

## Uninstall Istio and Cert-Manager

Istio and Cert-Manger are not removed by default.

To remove Istio

```bash
kubectl delete --ignore-not-found=true -f https://raw.githubusercontent.com/kalmhq/kalm/main/operator/resources/istio-in-one.yaml
```

To remove Cert-Manager

```bash
kubectl delete --ignore-not-found=true -f operator/resources/cert-manager/cert-manager.yaml
```