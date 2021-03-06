---
title: Install on Amazon EKS
---

This demo will walk you through how to use Terraform to install Kalm's Open Source version on a new Amazon EKS Kubernetes Cluster.

## Step 1: Install Prerequisites

First, make sure you have the following prerequisites installed:

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- Install [Amazon CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)

## Step 2: AWS Setup

Next, you will need an AWS service account set up and configured. Configure your [service credentials](https://console.aws.amazon.com/iam/home?#/security_credentials), then configure your AWS CLI with:

```bash
aws configure
```

You'll need to enter your Access key ID and secret.

## Step 3: Terraform Apply

Now that we're configured with AWS, we can use terraform to create a new cluster. 

Clone the repository below and `cd` into the eks directory

```bash
git clone https://github.com/kalmhq/tf-scripts
cd tf-scripts/eks
```

Create the cluster with the following commands:

```bash
terraform init
terraform apply
```

Type `yes` to confirm.

This process should take around 5-10 minutes.

Once it finishes, view the newly cluster with:

```bash
aws eks list-clusters
```

Now let's configure kubectl to use the new cluster.

```bash
aws eks --region us-west-2 update-kubeconfig --name NAME_OF_YOUR_CLUSTER
```

Verify the cluster is properly setup and accessible.

```sh
kubectl get nodes
```

## Step 4: Install Kalm

Now that the cluster is setup, we can install Kalm with the following command:

```bash
curl -sL https://get.kalm.dev | bash
```

This command usually takes less than 5 minutes to complete. Afterwards, Kalm will be installed!

To access your newly installed Kalm through localhost, simply open a port via:

```bash
kubectl port-forward -n kalm-system \
  $(kubectl get pod -n kalm-system \
    -l app=kalm \
    -ojsonpath="{.items[0].metadata.name}") \
  3010:3010
```

Now open http://localhost:3010/.

## Clean Up

This demo had you create a new cluster, which can incur charges! To delete the cluster and avoid resource charges, you can always type:

```bash
terraform destroy
```

## Next Step

You've now setup Kalm on an Amazon EKS cluster. To get a sense of how Kalm works, see the [Hello Kalm](/docs/tut-hello) tutorial.
