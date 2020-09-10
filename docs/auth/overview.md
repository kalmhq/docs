---
title: Authentication & Authorization
sidebar_label: Overview
---

This section will talk about **Authentication** and **Authorization**.

## Authentication (Identity source)

Authentication is the process of ascertaining that users are actually who they claim to be. There are many different authentication methods. Kalm supports two ways to authenticate users.

### Kalm Single Sign-On

During the Kalm installation process, the Kalm Single Sign-on is automatically initialized, and kalm-api is protected under an auth proxy.
The auth proxy will only allow requests from authenticated users.

The Kalm api server can parse users' single sign-on info injected into the http header. An user's email address is used as the identity, and groups map to roles.

[Learn more about Kalm Single Sign-On](./sso)<br />
[Single Sign-On CRD Reference](./sso)

### Access Token

The access token is a CRD (Custom Resource Definition). It is designed as a universal kalm authentication identity and can be granted any kalm permissions.
This flexibility can support any permission scenarios that may appear in the future. Currently, it is only used for webhook verification.
The token can be passed authorization header `Authorization: Bearer ${access_token}` when sending requests to kalm api server to authenticate.

[Learn more about Access Token (TODO)](./sso)<br />
[Access Token CRD Reference](./sso)

## Authorization (Permissions & Roles)

Authorization is the process of granting users permissions to specific resources.

When an authenticated entity sends a request to kalm-api, RBAC(Role-based access control) is used to determine whether the entity has sufficient permissions to access the resources.

### A note on Kubernetes RBAC

The kubernetes RBAC is very powerful and configurable for teams which require precise control at a granular level. However it can be overly complicated for simple scenarios involving standard permissions and roles. This complexity grows proportionately to the number of CRDs involved.

Therefore, Kalm implements a simpler, more intuitive RBAC system.

### Kalm RBAC

Kalm's permission system is similar to that of Github and Gitlab. There are only a few clearly defined roles such as **Viewer** and **Editor**, each corresponding to the _view_ and _edit_ permissions of resources within a certain range. The **Owner** role can operate on all resources.

[View detailed Role Permissions table](./roles)
