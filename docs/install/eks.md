---
title: AWS Elastic Kubernetes Service
---

We suggest 2 ways to setup your EKS cluster for Kalm:

- AWS command line tools.
- Terraform.

If you want to setup a cluster as soon as possible, the AWS command line is the way to go, while if you prefer the declarative configuration way to provision your cluster, then choose Terraform.

# AWS command-line tool

simplest way to setup EKS cluster is using command line tools: aws and eksctl.

**install aws & eksctl first**

- install aws: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html
- install eksctl: https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html#installing-eksctl

**config AWS-cli**

see [https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config) for details

**then create k8s cluster**

notes:

- see [https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html) for details
- replace <company-name\> & <cluster-name\> & region according to your case

```bash
# create key
aws ec2 create-key-pair --region us-east-2 --key-name keypair-for-<company-name>

# create eks cluster
eksctl create cluster \
--name <cluster-name> \
--region us-east-2 \
--with-oidc \
--ssh-access \
--ssh-public-key keypair-for-<company-name> \
--managed
```

the creation process takes 15 ~ 30 minutes, once completes, your `kubectl` config is auto-updated to use the newly created cluster as the current cluster, to double-check this, run `kubectl config get-context`, the new cluster should be marked with a `*` in the output.

# Terraform

## Prerequisites

1. a configured AWS Cli, for installation, check out [https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html), for configuration, checkout  [https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-config)
2. `kubectl`, for install, checkout [https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/)

## Clone the **Terraform workspace**

In your terminal, clone the repo at [https://github.com/kalmhq/terraform](https://github.com/kalmhq/terraform)

```bash
git clone https://github.com/kalmhq/terraform.git
# todo update files and make the repo public
```

change your directory into the repo, and you will see the Terraform configurations to setup your EKS cluster.

```bash
cd terraform/eks
```

## P**rovision the EKS cluster**

first initialize the Terraform workspace, which will download and configure the providers.

```bash
terraform init
```

then run `terraform apply` and review the planned actions.

```bash
terraform apply
```

Confirm the apply with a `yes`. The whole provision process can take 15 ~ 30 minutes.

## C**onfigure kubectl**

Run the following command to point your KUBECONFIG to the cluster you have just created

```bash
aws eks --region $(terraform output -raw region) update-kubeconfig --name $(terraform output -raw cluster_name)
```