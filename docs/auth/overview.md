---
title: Authentication & Authorization
sidebar_label: Auth Overview
---

Kalm has built in systems for managing user **Authentication** and **Authorization**. The following documentation provides a high level overview of how Kalm's Auth systems work.

## Authentication (Identity source)

Authentication is the process of verifying that users are actually who they claim to be. Kalm currently supports two methods of user Authentication: **Single Sign-On (SSO)** and **Access Tokens**.

### Kalm Single Sign-On

Single Sign-on is a standard Authentication scheme that verifies user identity through a username and password.

When you first install Kalm, a Single Sign-on system is automatically initialized. Kalm-api is protected under an auth proxy which only allows requests from authenticated users.

The Kalm api server can parse users' single sign-on info injected into the http header. A user's email address is used as the identity, and groups map to different roles.

[Learn more about Kalm Single Sign-On](./sso)<br />
[Single Sign-On CRD Reference](./sso)

### Access Token

The access token is a CRD (Custom Resource Definition). It is designed as a universal Kalm authentication identity and can be granted any Kalm permissions.
This flexibility is designed to support a wide range of permission scenarios. Currently, it is only used for webhook verification.

The access token can be passed an authorization header `Authorization: Bearer ${access_token}` when sending requests to the Kalm api server for authentication.

[Learn more about Access Token (TODO)](./sso)<br />
[Access Token CRD Reference](./sso)

## Authorization (Permissions & Roles)

While Authentication verifies **who** a user is, Authorization is the process of specifying **which permissions** users have to specific resources.

When an authenticated entity sends a request to kalm-api, RBAC(Role-based access control) is used to determine whether the entity has sufficient permissions to access the specified resource.

### Kalm RBAC

Kalm's permission system is similar to that of Github and Gitlab. There are only a few clearly defined roles such as **Viewer** and **Editor**, each corresponding to the _view_ and _edit_ permissions of resources within a certain range. The **Owner** role can operate on all resources.

For specific details on Kalm's Role Permission definitions, see our [detailed Role Permissions table](./roles)

#### A note on Kubernetes RBAC

The Kubernetes RBAC is powerful and configurable for teams which require precise control at a granular level. However, it can be quite complicated for simple scenarios involving standard permissions and roles. This complexity grows proportionately to the number of CRDs involved.

Kalm's RBAC system is designed to be initially simple and intuitive, while still allowing for complex customization if needed.
