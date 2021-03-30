---
title: AWS Elastic Kubernetes Service
---

This guide demonstrates how to create an Amazon EKS cluster using either the AWS Command Line Interface (CLI) or with Terraform. The resulting cluster generated from this guide will be ready to install Kalm.
## Prerequisites

Before following either guide below

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Install the [the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).
- Configure the AWS CLI with:
  ```shell
  $ aws configure
  AWS Access Key ID [None]: AKIAxxxxxxxxxEXAMPLE
  AWS Secret Access Key [None]: wJalrXUtxxxxxxxxxxxxxxXAMPLEKEY
  Default region name [None]: us-west-2
  Default output format [None]: json
  ```
  Access key ID and secret need to be entered in the prompt, find the access key information at [your aws page](https://console.aws.amazon.com/iam/home?#/security_credentials), create an access key if no one exists yet.

## Creating an EKS Cluster using The AWS CLI

In addition to the AWS CLI, this guide uses [eksctl](https://eksctl.io/) - a simple CLI tool for creating clusters on EKS.

**Install eksctl**

Follow Amazon's detailed [eksctl installation instructions](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html#installing-eksctl) for linux, mac, and windows.

```bash
# create key
aws ec2 create-key-pair --region us-east-2 --key-name keypair-for-kalm # <--- key-name can be updated according to your needs

# create eks cluster, for details, see: https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html
eksctl create cluster \
--name kalm-on-eks \  # <--- cluster name can be updated according to your needs
--region us-east-2 \  # <--- region can be updated according to your needs
--with-oidc \
--ssh-access \
--ssh-public-key keypair-for-kalm \ # <--- key can be updated according to your needs, make sure the key exist though
--managed
```

The creation process typically takes between 15 and 30 minutes. Once it completes, the `kubectl` config file will automatically update to use the newly created cluster as the current cluster. To double-check this, run `kubectl config get-context`. The new cluster should be marked with a `*` in the output.

## Creating an EKS Cluster with Terraform

Alternatively, the EKS Cluster can be created using Terraform. To use Terraform, first:

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)

Next, clone the git repository below and `cd` into the eks directory (script included below for convenience):

```
git clone https://github.com/kalmhq/terraform
cd terraform/eks
```

Create the cluster by running the following commands:

```
terraform init
terraform apply
```

Type `yes` to confirm.

This process should take around 15-30 minutes.

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
