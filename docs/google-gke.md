---
title: Install on Google Kubernetes Engine
---

The simplest way to provision a cluster on Google Cloud Platform is via Google Kubernetes Engine.

As a prerequisit, please install and authenticate the `gcloud` command line tool. Instructions can be found here.

## Step 1: Create a GKE Cluster

There are a few different ways to create a GKE Cluster. You can either create one through only gcloud, use the web interface, or with Terraform.

### Option A - gcloud command line

To begin, choose a <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects">Google Cloud project</a>

```bash
export PROJECT_ID=hello-kalm
```

Note: If you don't have an existing Google Cloud project, you can create one with:

```bash
export PROJECT_ID=hello-kalm
gcloud projects create $PROJECT_ID
```

Make sure <a href="https://cloud.google.com/billing/docs/how-to/modify-project#confirm_billing_is_enabled_on_a_project" target="_blank">billing is enabled.</a>

You need to enable Kubernetes Engine API as well:

```bash
gcloud services enable container.googleapis.com
```

<br/>

Next, provision a cluster with 4 nodes

```bash
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

```bash
gcloud container clusters get-credentials $CLUSTER_NAME \
  --zone $ZONE \
  --project $PROJECT_ID
```

Verify the cluster is properly setup and accessible.

```sh
kubectl cluster-info
```

### Option B - Terraform

If you are more familiar with Terraform, you can provision a demo cluster with the following steps.

First, <a href="https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started" target="_blank">install Terraform</a>.

Give Terraform access to the Application Default Credentials (ADC).

```bash
gcloud auth application-default login
```

Clone the repository below.

```bash
git clone https://github.com/kalmhq/terraform-gke
cd terraform-gke
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

```bash
gcloud container clusters get-credentials NAME_OF_YOUR_CLUSTER --zone ZONE_OF_CLUSTER
```

Verify the cluster is properly setup and accessible.

```sh
kubectl cluster-info
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
  3001:3001
```

Now open http://localhost:3001/

## Next Step

You've now setup Kalm on a GKE cluster. To get a sense of how Kalm works, see the [Hello Kalm](/docs/tut-hello) tutorial.
