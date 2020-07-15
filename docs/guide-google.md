---
title: Install on Google Kubernetes Engine
---

The simplest way to provision a cluster on Google Cloud Platform is via Google Kubernetes Engine.

As a prerequisit, please install and authenticate the `gcloud` command line tool. Instructions can be found here.

## Setup Cluster

To begin, choose a project

```
export PROJECT_ID=hello-kalm
```

Note: If you don't have an existing project, you can create one with:

```
export PROJECT_ID=hello-kalm
gcloud projects create $PROJECT_ID
```

Make sure <a href="https://cloud.google.com/billing/docs/how-to/modify-project#confirm_billing_is_enabled_on_a_project" target="_blank">billing is enabled.</a>

You need to enable Kubernetes Engine API as well:

```text
gcloud services enable container.googleapis.com
```

<br/>

Next, provision a cluster with 4 nodes

```
  export M_TYPE=n1-standard-2 && \
  export ZONE=us-west2-a && \
  export CLUSTER_NAME=${PROJECT_ID}-${RANDOM} && \
  gcloud container clusters create $CLUSTER_NAME \
  --cluster-version latest \
  --machine-type=$M_TYPE \
  --num-nodes 4 \
  --zone $ZONE \
  --project $PROJECT_ID
```

The creation of the cluster will take a few minutes. Once complete, point kubeconfig to the new cluster:

```
gcloud container clusters get-credentials $CLUSTER_NAME \
    --zone $ZONE \
    --project $PROJECT_ID
```

Verify context is properly setup and accessible

```
kubectl cluster-info
```

## Install Kalm Operator

Install the Kalm operator

```
curl -sL https://get.kalm.dev | bash
```

To enable localhost access, open a port via:

```
kubectl port-forward -n kapp-system \
  $(kubectl get pod -n kapp-system \
    -l app=kalm-dashboard \
    -ojsonpath="{.items[0].metadata.name}") \
  3001:3001
```

Now open http://localhost:3001/

To setup access directly via the cluster IP:

```
#TODO ask team how to do this
```

For setting up a service account, refer to [installation instructions](/docs/install#step-4-admin-service-account).
