---
title: Hello Kalm
---

Let's go through a simple example of deploying a single pod holding an nginx container.

This tutorial will teach you:

- the basic of how Kalm organizes deployments into applications
- Creating Application Configurations
- Opening a port and directing traffic to an application

## Step 1: Create Application

The main page of Kalm shows a list of applications. Press the "Add" Button

![add application](assets/add-app.png)

Enter a name for your application, such as "hello-kalm".

![name application](assets/name-app.png)

## Step 2: Create Component

An application is made of 1 or more components. Each component typically corresponds to an docker image. In this example, we will 1 component which holds the official nginx image.

Click the "Add Component" Button. Enter "webserver" into the Name field and "nginx:latest" into the Image field. Leave all other fields as is and click "Deploy"

![create component](assets/create-comp.png)

After a few seconds, a single Pod holding the nginx:latest image is successfully deployed to your cluster.

![first pod](assets/first-pod.png)

## Step 3: Examine and Modify Component

Let's examine our pod. Kalm provides a handy terminal for quick examinations into pods. Click the "Shell" Icon to connect a shell to the pod.

![shell button](assets/shell-button.png)

Let's run a few commands:

```
cd /etc/nginx
ls
cat nginx.conf
```

It seems this is the nginx container we wanted

![shell commands](assets/shell-cmd.png)

Next let's go back to the Components list, and edit our component.

Currently, a single pod is running on our cluster, because we specified 1 replica when creating the component. We can edit Application components at any time and redeploying it. Click the "Edit" button.

![edit component](assets/edit-comp.png)

Change the number of replicas to "3"

![increase replicas](assets/increase-replicas.png)

After a few moment, there should be three pods running.

![three pods](assets/three-pods.png)

You may have heard that kubernetes is "declarative", which means you specify the end result, and the kuberentes control plane figures out how to achieve the end result for you.

## Step 4: Port and HTTP access

Since nginx is a web server, what we really want is to be able to see it via a browser. To enable HTTP access, we have to do two things. First let's open a port on the component. Click Edit Component, then click on the "Networking" tab.

![networking tab](assets/networking-tab.png)

To open a port, lets specify two values, the "Container Port" and the "Service Port". Kalm tries to be helpful by providing visual reminders. The Container port should be 80 because thats what the nginx:latest image defaults to. TheService port can be an arbitrary port such as 8080.

![specify ports](assets/ports.png)

Click Deploy to update the deployment.

During the deployment you may notice that the number of pods temporarily exceeds three. By default, Kalm uses a rolling update, which means pods are incrementally added and removed one by one, resulting in zero downtime.

![rolling updates](assets/rolling-updates.png)

Now that the port is open, let's specify a route. Click the "Routes" tab, then click "Add"

![rolling updates](assets/add-route.png)

In the Routes section, let's enter "\*" for host, which allows us to visit directly via the IP.

![specify host](assets/specify-host.png)

Next open the targets selector, choose our component.

![add target](assets/add-target.png)

Click add, and a route will have been added. Mouse over "routes" and click on Open in browser.

![open in browser](assets/open-in-browser.png)

You should see a new tab with a "Welcome to nginx!" screen:

![nginx success](assets/nginx-success.png)

Congratulations, you've just deployed an application with an image, scaled it, edited, and setup routing so it can be visited from the outside world.

In the next tutorial involving multiple components working together, representing a real world "microservices" architecture.
