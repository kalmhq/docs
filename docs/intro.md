---
title: What is Kalm
---

Kalm (Kubernetes AppLication Manager) is an open source tool that makes it easier to manage applications on kubernetes. Kalm comes with a web interface for the most common operations including:

- Creation of new application deployments
- Deploying, updating, and scaling existing deployments
- Volume, config, and secret management

Kalm is installed as a kubernetes controller directly on your cluster:

![architecture](architecture)

In addition, Kalm pre-configures the Istio service mesh, which makes it easier to setup HTTPS certificates, setup routes to services, and much more.

# Why Kalm

Kuberenetes is a powerful and flexible tool for managing microservices. However first-time to setup and configuration can be daunting. The high upfront cost makes it prohibitive for smaller teams to adopt kubernetes. We made kalm in an attempt decrease the cognitive load for developers to interact with kubernetes in both development and production environments.

Kalm tries to reduce complexity in three different ways:

1. Provide intuitive graphical inteface with tips and instructions for the most common operations.
2. Introduce a new Custom Resource type called "Application". This natural grouping is helpful in reducing the amount of boilerplate configuration.
3. Preconfiguration of useful extensions - Kalm pre-configures modules such as the Istio service mesh to make it possible to quickly setting up things like HTTPS, routing, API gateways out of the box.

![Web Interface][interface]

Next, lets install Kalm and go through an example to illustrate how it works:

[interface]: /img/intro-ux.png
