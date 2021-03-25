---
title: AWS Elastic Kubernetes Service
---

There are many different ways to create an EKS cluster on Amazon. We will cover installing with AWS command-line and terraform.

## Prerequisites

First, make sure you have the [Amazon CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed.

Next, you will need an AWS service account set up and configured. Configure your [service credentials](https://console.aws.amazon.com/iam/home?#/security_credentials), then configure your AWS CLI with:

```
aws configure
```

You'll need to enter your Access key ID and secret.

## AWS command-line tool

**install eksctl first**

for details, see [this](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html#installing-eksctl).

**then create k8s cluster**

replace <company-name\> & <cluster-name\> & region according to your case

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

the creation process takes 15 ~ 30 minutes, once completes, your `kubectl` config is auto-updated to use the newly created cluster as the current cluster, to double-check this, run `kubectl config get-context`, the new cluster should be marked with a `*` in the output.

## Terraform

First, make sure you have the following prerequisites installed:

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)

Next, clone the repository below and `cd` into the eks directory

```
git clone https://github.com/kalmhq/tf-scripts
cd tf-scripts/eks
```

Create the cluster with the following commands:

```
terraform init
terraform apply
```

Type `yes` to confirm.

This process should take around 5-10 minutes.

Once it finishes, view the newly cluster with:

```
aws eks list-clusters
```

Now let's configure kubectl to use the new cluster.

```
aws eks --region us-west-2 update-kubeconfig --name NAME_OF_YOUR_CLUSTER
```

Verify the cluster is properly setup and accessible.

```
kubectl get nodes
```

## Next Step

You've now setup an Amazon EKS cluster. To install Kalm onto the cluster, see [Install Kalm Cloud](install-kalm-cloud).