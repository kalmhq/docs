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

When an authenticated entity sends a request to kalm-api to operate certain resources, kalm uses RBAC(Role-based access control) to determine whether the user has the permission to manage the target resource.

### Kubernetes RBAC is great, but...

The kubernetes RBAC is very powerful, and the configurable granularity is very fine,
This is undoubtedly an excellent tool for teams that need to precisely control every detail of permissions.

But precisely because the granularity is too fine and flexible,
when you don’t need too many special customizated permissions roles,
it feels too complicated in the actual usages. With the increasing number of CRDs, this problem has became more serious.

So Kalm implements its own RBAC with intuitional built-in roles.

### Kalm RBAC

Kalm want to design a permission system similar to Github and Gitlab. There are several clear roles, such as Viewer and Editor,
corresponding to the view and edit permissions of resources within a certain range. Owner can operate all resources.

[View detailed Role Permissions table](./roles)
