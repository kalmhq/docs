---
title: Impersonation
---

It can be useful to log into Kalm as a certain entity to verify the permissions for a certain role binding or access token is functioning as intended. If you posess the **clusterOwner** role, you can impersonate any entity.

To impersonate an entity when sending requests to kalm-api, add the corresponding impersonation info into the `Kalm-Impersonation` section of the header.
