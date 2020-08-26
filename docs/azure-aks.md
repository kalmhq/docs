---
title: Install on Azure
---

There are a few different ways to create a Kubernetes Cluster on Azure. The following guide utilizes Terraform to provision an Azure AKS cluster.

## Step 1: Install Prerequisits

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/azure-get-started)
- Install [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

## Step 2: Azure Setup

You need an Azure account which you can log into the azure CLI with:

```sh
az login
```

Next, create a service principal account so Terraform can authenticate to Azure:

```sh
az ad sp create-for-rbac --skip-assignment
```

Note: the resulting output only appears once. Save the appId and password immediately. Otherwise it takes non-trivial effort to retrieve the information.

## Step 3: Terraform Apply

Clone the repository below and `cd` into the aks directory

```sh
git clone https://github.com/kalmhq/tf-scripts
cd tf-scripts/aks
```

Open 'terraform.tfvars', and paste in the appId and password from Step 2.

```
# terraform.tfvars
appId    = "REPLACE_WITH_YOUR_APP_ID"
password = "REPLACE_WITH_YOUR_PASSWORD"
```

Install the cluster with the following commands.

```
terraform init
terraform apply
```

Type `yes` to confirm the installation.

After 5-10 minutes, the cluster should be created. Once complete, record the **kubernetes_cluster_name** and **resource_group_name** from the terraform output.

```sh
terraform output
```

Configure kubectl to use the new cluster.

```bash
az aks get-credentials --resource-group NAME_OF_YOUR_RESOURCE_GROUP --name NAME_OF_YOUR_CLUSTER
```

Verify the cluster is properly setup and accessible.

```sh
kubectl cluster-info
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

```
terraform destroy
```

## Next Step

You've now setup Kalm on an Azure AKS cluster. To get a sense of how Kalm works, see the [Hello Kalm](/docs/tut-hello) tutorial.
