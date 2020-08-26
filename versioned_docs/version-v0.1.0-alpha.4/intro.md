---
title: What is Kalm
hide_title: false
hide_table_of_contents: true
sidebar_label: What is Kalm

# SEO options
description: What is kalm
keywords:
  - docs
  - docusaurus
image: https://i.imgur.com/mErPwqL.png
---

Kalm (Kubernetes AppLication Manager) is an open source tool that makes it easier to manage applications on kubernetes without struggling with yamls. Kalm comes with a web interface for the most common operations including:

- Creation of new application deployments
- Deploying, updating, and scaling existing deployments
- Volume, config, and secret management

Kalm is installed as a kubernetes controller directly on your cluster, and automatically sets up istio and cert-manager, which makes it easy to configure HTTPS certificates, routes, SSO, and logging system out of the box.

![Web Interface](assets/kalm.png)

## Why Kalm

Kuberenetes is a powerful and flexible tool for managing microservices. However first-time to setup and configuration can be daunting. The high upfront cost makes it prohibitive for smaller teams to adopt kubernetes. We made kalm in an attempt decrease the cognitive load for developers to interact with kubernetes in both development and production environments.

Kalm tries to reduce complexity in three different ways:

1. Provide intuitive graphical inteface for the most common operations.
2. Introduce higher level Custom Resource Definitions such as `Application`. These CRDs help reducing the amount of boilerplate configuration and copy-pasting.
3. Designed with popular extensions in mind - Kalm is designed to work with istio, cert-manager, and prometheus and more, which make setting up a productive stack quick and easy.

Next, lets install Kalm and go through an example to illustrate how it works.
