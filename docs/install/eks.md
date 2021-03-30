---
title: AWS Elastic Kubernetes Service
---

This guide demonstrates how to create an Amazon EKS cluster using either the AWS Command Line Interface (CLI) or with Terraform. The resulting cluster generated from this guide will be ready to install Kalm.

## Prerequisites

Before following either guide below

- Install the [Amazon CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- Create and configure an AWS Service Account. Configure the [service credentials](https://console.aws.amazon.com/iam/home?#/security_credentials), then configure the AWS CLI with:

```
aws configure
```

The Access key ID and secret for this service account will need to be provided.

## Creating an EKS Cluster using The AWS CLI

In addition to the AWS CLI, this guide uses [eksctl](https://eksctl.io/) - a simple CLI tool for creating clusters on EKS.

**Install eksctl**

Follow Amazon's detailed [eksctl installation instructions](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html#installing-eksctl) for linux, mac, and windows.

**Create an EKS Cluster**

Before running the command below, specify <company-name\>, <cluster-name\>, and modify the region if needed. Once modified, run the command to create an EKS cluster.

```bash
# create key
aws ec2 create-key-pair --region us-east-2 --key-name keypair-for-<company-name>

# create eks cluster, for details, see: https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html
eksctl create cluster \
--name <cluster-name> \
--region us-east-2 \
--with-oidc \
--ssh-access \
--ssh-public-key keypair-for-<company-name> \
--managed
```

The creation process typically takes between 15 and 30 minutes. Once it completes, the `kubectl` config file will automatically update to use the newly created cluster as the current cluster. To double-check this, run `kubectl config get-context`. The new cluster should be marked with a `*` in the output.

## Creating an EKS Cluster with Terraform

Alternatively, the EKS Cluster can be created using Terraform. To use Terraform, first:

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)

Next, clone the git repository below and `cd` into the eks directory (script included below for convenience):

```
git clone https://github.com/kalmhq/tf-scripts
cd tf-scripts/eks
```

Create the cluster by running the following commands:

```
terraform init
terraform apply
```

Type `yes` to confirm.

This process should take around 5-10 minutes.

Once it finishes, view the newly created cluster with:

```
aws eks list-clusters
```

The following command configures kubectl to use the new cluster.

```
aws eks --region us-west-2 update-kubeconfig --name NAME_OF_YOUR_CLUSTER
```

Verify the cluster is properly setup and accessible.

```
kubectl get nodes
```

## Next Step

To install Kalm onto the cluster, see [Install Kalm Cloud](install-kalm-cloud).
