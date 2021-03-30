---
title: AWS Elastic Kubernetes Service
---

There are many different ways to create an EKS cluster on Amazon. We will cover installing with the AWS command-line and terraform.

## Prerequisites

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Install [the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).
- Configure the AWS CLI with:
  ```shell
  $ aws configure
  AWS Access Key ID [None]: AKIAxxxxxxxxxEXAMPLE
  AWS Secret Access Key [None]: wJalrXUtxxxxxxxxxxxxxxXAMPLEKEY
  Default region name [None]: us-west-2
  Default output format [None]: json
  ```
  Access key ID and secret need to be entered in the prompt, find the access key information at [your aws page](https://console.aws.amazon.com/iam/home?#/security_credentials), create an access key if no one exists yet.

## AWS command-line tool

**install eksctl first**, for details, see [this](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html#installing-eksctl).

**then create k8s cluster**

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

the creation process takes 15 ~ 30 minutes, once completes, your `kubectl` config is auto-updated to use the newly created cluster as the current cluster, to double-check this, run `kubectl config get-context`, the new cluster should be marked with a `*` in the output.

## Terraform

First, make sure [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) is installed.

Next, clone the repository below and `cd` into the eks directory

```
git clone https://github.com/kalmhq/terraform
cd terraform/eks
```

Create the cluster with the following commands:

```
terraform init
terraform apply
```

Type `yes` to confirm.

This process should take around 15-30 minutes.

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