---
title: Roles
hide_table_of_contents: true
---

This table defines which roles can access resources in which way and in which scope

|                           | Application Viewer | Application Editor | Application Owner | Cluster Viewer | Cluster Editor | Cluster Owner |
| ------------------------- | ------------------ | ------------------ | ----------------- | -------------- | -------------- | ------------- |
| view application          | ✓                  | ✓                  | ✓                 | ✓              | ✓              | ✓             |
| create aplication         |                    |                    |                   |                | ✓              | ✓             |
| edit application          |                    |                    |                   |                | ✓              | ✓             |
| delete application        |                    |                    |                   |                | ✓              | ✓             |
| view component            | ✓                  | ✓                  | ✓                 | ✓              | ✓              | ✓             |
| create component          |                    | ✓                  | ✓                 |                | ✓              | ✓             |
| edit component            |                    | ✓                  | ✓                 |                | ✓              | ✓             |
| delete component          |                    | ✓                  | ✓                 |                | ✓              | ✓             |
| delete pod                |                    | ✓                  | ✓                 |                | ✓              | ✓             |
| view pod logs             | ✓                  | ✓                  | ✓                 | ✓              | ✓              | ✓             |
| exec in pod               |                    | ✓                  | ✓                 |                | ✓              | ✓             |
| view routes               | ✓(1)               | ✓(1)               | ✓(1)              | ✓              | ✓              | ✓             |
| create route              |                    | ✓(1)               | ✓(1)              |                | ✓              | ✓             |
| update route              |                    | ✓(1)               | ✓(1)              |                | ✓              | ✓             |
| delete route              |                    | ✓(1)               | ✓(1)              |                | ✓              | ✓             |
| view services             | ✓                  | ✓                  | ✓                 | ✓              | ✓              | ✓             |
| view protected endpoint   | ✓                  | ✓                  | ✓                 | ✓              | ✓              | ✓             |
| create protected endpoint |                    | ✓                  | ✓                 |                | ✓              | ✓             |
| edit protected endpoint   |                    | ✓                  | ✓                 |                | ✓              | ✓             |
| delete protected endpoint |                    | ✓                  | ✓                 |                | ✓              | ✓             |
| view storage classes      | ✓                  | ✓                  | ✓                 | ✓              | ✓              | ✓             |
| view disks(pvc)           | ✓                  | ✓                  | ✓                 | ✓              | ✓              | ✓             |
| delete disk(pv)           |                    |                    |                   |                | ✓              | ✓             |
| view https certs          |                    |                    |                   | ✓              | ✓              | ✓             |
| create/upload https certs |                    |                    |                   |                | ✓              | ✓             |
| edit uploaded https certs |                    |                    |                   |                | ✓              | ✓             |
| delete https certs        |                    |                    |                   |                | ✓              | ✓             |
| view pvs                  |                    |                    |                   | ✓              | ✓              | ✓             |
| view registries           |                    | ✓                  | ✓                 | ✓              | ✓              | ✓             |
| create registry           |                    |                    |                   |                | ✓              | ✓             |
| edit registry             |                    |                    |                   |                | ✓              | ✓             |
| delete registry           |                    |                    |                   |                | ✓              | ✓             |
| view nodes                |                    |                    |                   | ✓              | ✓              | ✓             |
| cordon nodes              |                    |                    |                   |                | ✓              | ✓             |
| uncordon nodes            |                    |                    |                   |                | ✓              | ✓             |
| view logging systems      |                    |                    |                   | ✓              | ✓              | ✓             |
| create logging system     |                    |                    |                   |                | ✓              | ✓             |
| update logging system     |                    |                    |                   |                | ✓              | ✓             |
| delete logging system     |                    |                    |                   |                | ✓              | ✓             |
| view cluster info         | ✓(2)               | ✓(2)               | ✓(2)              | ✓              | ✓              | ✓             |
| initialize cluster        |                    |                    |                   |                |                | ✓             |
| reset cluster             |                    |                    |                   |                |                | ✓             |
| view sso config           |                    |                    |                   | ✓(3)           | ✓              | ✓             |
| create sso config         |                    |                    |                   |                | ✓              | ✓             |
| edit sso config           |                    |                    |                   |                | ✓              | ✓             |
| delete sso config         |                    |                    |                   |                | ✓              | ✓             |
| view access token         |                    | ✓(4)               | ✓(4)              |                | ✓(4)           | ✓             |
| create access token       |                    | ✓(4)               | ✓(4)              |                | ✓(4)           | ✓             |
| edit access token         |                    | ✓(4)               | ✓(4)              |                | ✓(4)           | ✓             |
| delete access token       |                    | ✓(4)               | ✓(4)              |                | ✓(4)           | ✓             |
| view users roles          |                    |                    | ✓                 |                | ✓              | ✓             |
| grant/revoke user roles   |                    |                    | ✓(5)              |                | ✓(5)           | ✓             |

1. HttpRoute targes can cross applications. A httpRoute is visible to a user only when the user has view permission for all targets. The same for edit permissions.
2. Ingress IP and Ingress hostname are not visible by application roles.
3. No api/secret informations
4. A user can view/edit a access token only if the user's permissions is greater or equal than the access token.
5. Cluster editor can grant/revoke application user roles, but not cluster level. Application owner can grant/revoke user roles under the same application.

:::note
If the user identity is valid, the list api will not return 401, but will hide all items that are not authorized. But other api will return 401 if the request resource is not authorized.
:::

## How to create role binding

### Via dashboard

:::note
Working in progress
:::

### Via kubectl

:::note
Working in progress
:::