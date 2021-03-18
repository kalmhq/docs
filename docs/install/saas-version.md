---
title: Install the SaaS Version
---

1. go to [http://kalm.dev/signin](http://kalm.dev/signin)
2. after sign in, click the **INSTALL NEW CLUSTER** button in the upper right corner:

    ![assets/Untitled.png](../assets/install-saas-0-new-cluster.png)

3. choose a name for your cluster

![cluster name](../assets/install-saas-1-cluster-name.png)

4. run the command to install Kalm on your cluster:

:::note
to make sure your `kubectl` is pointing at the cluster for Kalm, run `kubectl config get-context`, the new cluster should be marked with a `*` in the output.
:::

![cmd](../assets/install-saas-2-cmd.png)

the install process will be updated during the execution:

![install-progress](../assets/install-saas-3-install-progress.png)

usually the whole process took 5 - 15 minutes.

5. once done, click the **GO TO DASHBOARD** button to start using Kalm

![done](../assets/install-saas-4-done.png)