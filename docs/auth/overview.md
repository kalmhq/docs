---
title: Authentication & Authorization
sidebar_label: Overview
---

This section will talk about **Authentication** and **Authorization**.

## Authentication (Identity source)

Authentication is the process of ascertaining that somebody really is who they claim to be, then get their identify. This can be done in the following two ways.

### Kalm Single Sign-On

When your cluster is successfully initialized, the kalm Single Sign-on feature should be working, and the kalm-api is protected under auth proxy.
If a request can pass the auth proxy's review, it means that he has completed the authentication process.
Kalm api server can parse user info from single sign-on info http header that are injected by auth proxy.
The user's email address will be used as the user's identity, and groups will be used as roles.

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