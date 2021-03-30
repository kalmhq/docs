---
title: Google Kubernetes Engine
---

We suggest 3 ways to setup the GKE cluster for Kalm:

- GKE web console
- gcloud command line
- Terraform

## GKE web console

The simplest way to setup GCP k8s cluster is using the web:

- go to [https://console.cloud.google.com/kubernetes/list](https://console.cloud.google.com/kubernetes/list)
- click **CREATE CLUSTER**
- the default values for the cluster are mostly reasonable, so only update the cluster name and other fields that you want to update.
- click **CREATE**
- the cluster creation process takes 5 ~ 10 minutes
- once finished, go to [https://console.cloud.google.com/kubernetes/list](https://console.cloud.google.com/kubernetes/list), click the 3 dots on the right of your cluster, click Connect.
    - you may need to enable the Kubernetes API
- Copy the command-line access and run it in your local terminal, this command will help you setup the `kubectl config` to access the cluster you just created.

## gcloud command line

:::note prerequisite
- Install and authenticate the gcloud command line tool. Instructions can be found [here](https://cloud.google.com/sdk/docs).
- Install `kubectl`, Instructions can be found [here](https://kubernetes.io/docs/tasks/tools/#kubectl).
:::


To begin, choose [a Google Cloud project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

```
export PROJECT_ID=hello-kalm
```

Note: If you don't have an existing Google Cloud project, you can create one with:

```
export PROJECT_ID=hello-kalm
gcloud projects create $PROJECT_ID
```

Make sure [billing is enabled](https://cloud.google.com/billing/docs/how-to/modify-project##confirm_billing_is_enabled_on_a_project).

You need to enable Kubernetes Engine API as well:

```
gcloud services enable container.googleapis.com
```

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

The creation of the cluster will take a few minutes. Once complete, configure kubectl to use the new cluster:

```
gcloud container clusters get-credentials $CLUSTER_NAME \
  --zone $ZONE \
  --project $PROJECT_ID
```

Verify the cluster is properly setup and accessible.

```
kubectl cluster-info
```

## Terraform

:::note prerequisite
- Install and authenticate the gcloud command line tool. Instructions can be found [here](https://cloud.google.com/sdk/docs).
- Install `kubectl`, Instructions can be found [here](https://kubernetes.io/docs/tasks/tools/#kubectl).
:::

If you are more familiar with Terraform, you can provision a demo cluster with the following steps.

First, [install Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started).

Give Terraform access to the Application Default Credentials (ADC).

```
gcloud auth application-default login
```

You will need to have the Kubernetes Engine API enabled for your project as well:

```
gcloud services enable container.googleapis.com
```

Clone the repository below.

```
git clone https://github.com/kalmhq/terraform
cd terraform/gke
```

Open 'terraform.tfvars', and specify the ID of the Google Cloud project you would like to install to.

```
# terraform.tfvars
project_id = "REPLACE_ME"
region     = "us-west2"
```

Install the cluster with the following commands.

```
terraform init
terraform apply
```

Type `yes` to confirm the installation.

After 5-10 minutes, the cluster should be created. Once complete, retrieve the name of the newly created cluster.

```
terraform output
```

Configure kubectl to use the new cluster.

```
gcloud container clusters get-credentials NAME_OF_YOUR_CLUSTER --zone ZONE_OF_CLUSTER
```

- *Note - You can see your project's zone on your [gcloud console](https://console.cloud.google.com/) or in your CLI enter: `gcloud info | grep "zone"`*

Verify the cluster is properly setup and accessible.

```
kubectl cluster-info
```

## Next Step

You've now setup a GKE cluster. To install Kalm onto the cluster, see [Install Kalm Cloud](install-kalm-cloud).