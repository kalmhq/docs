---
title: Google Kubernetes Engine
---

We suggest 2 ways to setup your GKE cluster for Kalm:

- GKE web console
- Terraform

If you want to setup a cluster as soon as possible, the GKE web console is the way to go, while if you prefer the declarative configuration way to provision your cluster, then choose Terraform.

# GKE web console

simplest way to setup GCP k8s cluster is using the Web

- go to [https://console.cloud.google.com/kubernetes/list](https://console.cloud.google.com/kubernetes/list)
- click **CREATE CLUSTER**
- the default values for the cluster are mostly reasonable, so only update the cluster name and other fields that you want to update.
- click **CREATE**
- the cluster creation process takes 5 ~ 10 minutes
- once finished, go to [https://console.cloud.google.com/kubernetes/list](https://console.cloud.google.com/kubernetes/list), click the 3 dots on the right of your cluster, click Connect.
    - you may need to enable the Kubernetes API
- Copy the command-line access and run it in your local terminal, this command will help you setup the `kubectl config` to access the cluster you just created.

# Terraform

## Prerequisites

1. a configured gcloud SDK, for install instructions, check out [https://cloud.google.com/sdk/docs/quickstart](https://cloud.google.com/sdk/docs/quickstart)
2. `kubectl`, for install instructions, checkout [https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/)

## Clone the **Terraform workspace**

In your terminal, clone the repo at [https://github.com/kalmhq/terraform](https://github.com/kalmhq/terraform)

```bash
git clone https://github.com/kalmhq/terraform.git
```

change your directory into the repo, and you will see the Terraform configurations to setup your EKS cluster.

```bash
cd terraform/gke
```

## Update your terraform.tfvars file

Your `terraform.tfvars` file should look like the following:

```bash
project_id = "REPLACE_ME"
region     = "us-central1"
```

Replace the values in your file with your `project_id` and `region`.

## Provision the EKS cluster

first initialize the Terraform workspace, which will download and configure the providers.

```bash
terraform init
```

then run `terraform apply` and review the planned actions.

```bash
terraform apply
```

Confirm the apply with a `yes`. The whole provision process can take 15 ~ 30 minutes.

## Configure kubectl

Run the following command to retrieve the access credentials for your cluster and automatically configure kubectl.

```bash
$ gcloud container clusters get-credentials $(terraform output -raw kubernetes_cluster_name) --region $(terraform output -raw region)
```