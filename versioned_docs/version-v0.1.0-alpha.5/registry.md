---
title: Private Image Registry
---

If your image resides in a private registry, you must configure permissions or you'll receive a `PullImageError` when deploying applications.

Kalm can help you simplify the process of configuring Private Image Registries.

## Example Usage

As a prerequisite you need access to a private registry. One option is to create a <a href="https://docs.docker.com/docker-hub/repos/#private-repositories">free private repository</a> on Docker Hub.

Let's upload an image to a private dockerhub registry.

Start by pulling down the `busybox` image onto your local machine, then re-tag it and upload to your private repo. Replace `<MYREPO>` with the name of your repository.

```
docker pull busybox
docker tag busybox:latest <MYREPO>/private-busybox:latest
docker push <MYREPO>/private-busybox:latest
```

Now let's create a new application with a component using this private image.

- Create an Application
- Create a Component with `<MYREPO>/private-busybox:latest` as the image
- In the command field, enter <code>/bin/sh -c \`sleep 10000\`</code> to keep the container alive.
- Click **Deploy Component**

You should get a "Failed to pull Image..." error.

![cannot pull error](assets/pull-error.png)

This error is expected because the pod does not have permission to pull the specified image.

### Adding a Private Repository

We can fix the issue by adding a private registry.

- Click **Registries** in the left navigation sidebar
- Click **Add Registry**
- Enter username and password for your repository. The host can be blank if you are using hub.docker.com, otherwise enter the full URL(i.e https://gcr.io)

- Press **Save**

![registry form](assets/add-registry-form.png)

If the login info is correct, you should see the Verified checkbox light up shortly.

![registry validated](assets/registry-validated.png)

### Redeploy

Now let's redeploy our application.

Go back to the component and **delete the failing pod**. Deleting a pod will trigger a redeployment. This time, the pod should be successfully deployed.
