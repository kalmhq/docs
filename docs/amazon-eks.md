---
title: Install on Amazon EKS
---

There are a many different ways to create a Kubernetes Cluster on Amazon. We will cover kops and terraform.

## Step 1: Install Prerequisits

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/azure-get-started)
- Install [Amazon CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

## Step 2: Azure Setup

You need an AWS service account. Configure [service credentials](https://console.aws.amazon.com/iam/home?#/security_credentials), then configure the aws CLI with:

```bash
aws configure
```

Enter your Access key ID and secret.

## Step 3: Terraform Apply

Clone the repository below and `cd` into the aks directory

```bash
git clone https://github.com/kalmhq/tf-scripts
cd tf-scripts/eks
```

Install the cluster with the following commands.

```bash
terraform init
terraform apply
```

Type `yes` to confirm the installation.

After 5-10 minutes, the cluster should be created.

View the newly cluster with:

```bash
aws eks list-clusters
```

Configure kubectl to use the new cluster.

```bash
aws eks --region us-west-2 update-kubeconfig --name NAME_OF_YOUR_CLUSTER
```

Verify the cluster is properly setup and accessible.

```sh
kubectl get nodes
```

## Step 4: Install Kalm

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
  3010:3010
```

Now open http://localhost:3010/

## Clean Up

Delete the cluster to avoid resource charges.

```bash
terraform destroy
```

## Next Step

You've now setup Kalm on an Amazon EKS cluster. To get a sense of how Kalm works, see the [Hello Kalm](/docs/tut-hello) tutorial.
