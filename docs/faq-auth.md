---
title: Authorization
---

Kapp is using k8s [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) for authentication. Generally, authorization info is passing through `Authorization` Header. A user should provide enough info to construct this header for kapp, then kapp will pass it to kubernetes api server. If you are running kapp behind a proxy, which is in charge of authentication and providing `Authorization` header, then kapp will use the header directly. Kubernetes API server needs to be configured properly to accept these tokens.

_IMAGE_PLACE_HOLDER_

### Username and password:
You need to config static user for k8s first. It's easy to understand but rarely used, as extra configuration and a restart are required. Learn more from https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-password-file

### Token
Kubernetes has various ways to config token.
- [Static Token](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#static-password-file). This method will require extra configuration on your api server, and a restart is required.
- [Bootstrap Tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#bootstrap-tokens)
- [Service Account Tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#bootstrap-tokens). The following sections shows how to login by using a servier account token.
- [OIDC Tokens](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#bootstrap-tokens). This is a advanced way to authorize users. There is another artical to talk about OIDC with kapp. You can find out more details there. TODO

## Create a test user

IMPORTANT: This is for test only! Do not create token this way on a production cluster. Make sure that you know what you are doing before proceeding. Granting admin privileges to Dashboard's Service Account might be a security risk.

To bypass the annoying configuration and restart, in this guide, we will find out how to create a new user using Service Account mechanism of Kubernetes, grant this user admin permissions and login to Kapp Dashboard using bearer token tied to this user.

The commands should be executed in the same shell seesion.

1. Create a service account

```bash
kubectl create sa kapp-sample-user
```

2. grant admin permission to the service account

```bash
kubectl create clusterrolebinding kapp-sample-user-admin --user=system:serviceaccount:default:kapp-sample-user --clusterrole=cluster-admin
```

1. Get service account secret name

```
secret=$(kubectl get sa kapp-sample-user -o json | jq -r .secrets\[\].name)
echo $secret
```

You will see some token name like `kapp-sample-user-token-vbhwr`

4. Get secret token

```
secret_token=$(kubectl get secret $secret -o json | jq -r '.data["token"]' | base64 -D)
echo $secret_token
```

5. Use the token you got to login

_IMAGE_PLACEHOLDER_

you will success login.

_IMAGE_PLACEHOLDER_
