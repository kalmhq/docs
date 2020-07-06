---
title: Installation
---

### Compatibility Matrix

kapp is intended to be backward compatible. It is always recommended to use the latest version of kapp with whatever version of Kubernetes you are using. The numbering follows the semantic versioning specification, MAJOR.MINOR.PATCH.

_**TODO** test usability on each version of k8s._

| kapp version | k8s 1.14.x | k8s 1.15.x | k8s 1.16.x | k8s 1.17.x |
| ------------ | ---------- | ---------- | ---------- | ---------- |
| 0.1.0        | ✔          | ✔          | ✔          | ✔          |

### Prerequisite

k8s cluster is required.

kubectl is required, see [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

A cluster-admin role is required to install kapp on your cluster. If you are not familiar with k8s RBAC, you can just use the very first user of your cluster.

## Step 1: Obtaining a kubernetes cluster

You can use either local cluster such as minikube, or a cloud based cluster like GKE or AKS.

### Minikube

Directions for minikube

### GKE

Directions for GKE

## Step 2: Install Kalm onto cluster

### Installing from Script

Install via script

```
kubectl apply -f https://get.kalm.dev
```

### Install from Source

TODO: move final docs from source directory to here

## Step 3: Launch Kalm

### Configuring Permissions

IMPORTANT: This is for test only! Do not create token this way on a production cluster. Make sure that you know what you are doing before proceeding. Granting admin privileges to Dashboard's Service Account might be a security risk.

To bypass the annoying configuration and restart, in this guide, we will find out how to create a new user using Service Account mechanism of Kubernetes, grant this user admin permissions and login to Kapp Dashboard using bearer token tied to this user.

The commands should be executed in the same shell seesion.

1. Create a service account

```
kubectl create sa kapp-sample-user
```

2. grant admin permission to the service account

```
kubectl create clusterrolebinding kapp-sample-user-admin --user=system:serviceaccount:default:kapp-sample-user --clusterrole=cluster-admin
```

3. Get service account secret name

```
secret=$(kubectl get sa kapp-sample-user -o json | jq -r .secrets\[\].name)
echo $secret
```

You will see some token name like `kapp-sample-user-token-vbhwr`

4. Get secret token

```
secret_token=$(kubectl get secret $secret -o json | jq -r '.data["token"]' | base64 -D)
echo $secret_token
```

5. Use the token you got to login

_IMAGE_PLACEHOLDER_

you will success login.

_IMAGE_PLACEHOLDER_

Now everything is setup. Next, let's deploy an application.
