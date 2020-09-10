---
title: Impersonation
---

After creating the role binding or access token, in order to ensure that the permissions are correct, you may need to log in to kalm as this entity for testing.
You can use the impersonation function to simulate without knowing the real authentication information. Please note that this feature requires you to have the clusterOwner role.

When you send requests to kalm api, add the impersonation info into `Kalm-Impersonation` header.
