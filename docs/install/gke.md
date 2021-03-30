---
title: Google Kubernetes Engine
---

This guide demonstrates how to create a GKE cluster using any of the following options:

- The Google Cloud Console (web interface at https://console.cloud.google.com/)
- The gcloud command-line tool
- Terraform

## Create a GKE Cluster using The Google Cloud Console

The simplest way to create a GKE cluster is by using the Google Cloud Console, which acts as a web interface for GCP. Use the following steps to create a GKE cluster:

- Go to [https://console.cloud.google.com/kubernetes/list](https://console.cloud.google.com/kubernetes/list)
- Click **CREATE CLUSTER**
    - Select a cluster name, and customize any other fields as needed (default options will work)
- Click **CREATE**
    - The cluster creation process typically takes 5-10 minutes

Once the cluster is created:
- Go to [https://console.cloud.google.com/kubernetes/list](https://console.cloud.google.com/kubernetes/list), click the 3 dots to the right of the newly created cluster, and select Connect
    - Enable the Kubernetes API if not already enabled
- Copy the command-line access command and run it on a local terminal. This command will configure `kubectl config` to access the newly created cluster.

## Create a GKE Cluster using The Gcloud Command-Line Tool

GKE Clusters can also be created using Google's gcloud CLI. The gcloud CLI is included in their SDK, which can be installed by following instructions in [Google's SDK installation docs](https://cloud.google.com/sdk/docs).

GKE clusters are organized within [Google Cloud Projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects). The project name is used in several spots, so for the sake of simplicity this demo sets a PROJECT_ID variable to the name of the project used.

```
export PROJECT_ID=hello-kalm
```

This can be either an existing project or a new one. To create a new project, run the command below (the project name is set to "hello-kalm" in this example):

```
gcloud projects create $PROJECT_ID
```

In order to create a Kubernetes cluster on GCP [billing must be enabled](https://cloud.google.com/billing/docs/how-to/modify-project##confirm_billing_is_enabled_on_a_project) for that project. By default, new projects will **not** have billing enabled.

Additionally, projects need to specifically enable the Kubernetes Engine API, which can be done using the command below:

```
gcloud services enable container.googleapis.com
```

With billing and engine API enabled, the following commands will provision a cluster with 4 nodes (modify the zone as needed):

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

It will take a few minutes to create the cluster. Once complete, configure kubectl to use the new cluster:

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

Alternatively, the GKE Cluster can be created using Terraform. To use Terraform, first:

- Install [The gcloud CLI](https://cloud.google.com/sdk/docs).
- Install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started).
- Install [kubectl](https://kubernetes.io/docs/tasks/tools/included/install-kubectl-gcloud/)

GKE clusters are organized within [Google Cloud Projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects). A new project can be created with:

```
gcloud projects create PROJECT-NAME-HERE
```

Use the `gcloud init` command and select the new (or existing) project ([usage details here](https://cloud.google.com/sdk/gcloud/reference/init)).

Terraform also requires access to the Application Default Credentials (ADC), which can be granted using the following command:

```
gcloud auth application-default login
```

The Kubernetes Engine API will need to be enabled for the project as well, which can be done using the following command:

```
gcloud services enable container.googleapis.com
```

Clone the repository below to download Kalm's installation scripts for Terraform.

```
git clone https://github.com/kalmhq/terraform
cd terraform/gke
```

Open 'terraform.tfvars' in a text editor and specify the ID of the current Google Cloud project. The region can be specified as well.

```
# terraform.tfvars
project_id = "REPLACE_ME"
region     = "us-west2"
```

With these settings configured, create the cluster by using the following commands:

```
terraform init
terraform apply
```

Type `yes` to confirm the installation.

The process should take around 5-10 minutes. Once complete, retrieve the name of the newly created cluster.

```
terraform output
```

Configure kubectl to use the new cluster.

```
gcloud container clusters get-credentials NAME_OF_YOUR_CLUSTER --zone ZONE_OF_CLUSTER
```

- *Note - identify the project's zone either on [gcloud console](https://console.cloud.google.com/) or using the CLI by entering: `gcloud info | grep "zone"`*

Verify the cluster is properly setup and accessible.

```
kubectl cluster-info
```

## Next Step

To install Kalm onto the cluster, see [Install Kalm Cloud](install-kalm-cloud).
