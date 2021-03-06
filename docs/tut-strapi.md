---
title: "Strapi on Kalm"
---

Kalm provides a quick dashboard to simplify your daily work, but sometimes you may still want to set things up with YAML files. Fortunately, it's designed to be mutually inclusive with other ways of applying YAML files.

In this tutorial, we will show you how to install the headless CMS project: [Strapi](https://strapi.io/) by applying YAML files through kubectl. As you go through this process, you can check the Kalm Dashboard to see how it automatically pulls in your work.

## Objectives

- Deploy MongoDB on Kalm as an Component
- Deploy Strapi on Kalm as an Component

## Before you begin

- You'll need a Kubernetes cluster with Kalm installed

## Deploy MongoDB

Define the DB by using a Component. Use kubectl to apply the YAML file below:

```yaml
apiVersion: core.kalm.dev/v1alpha1
kind: Component
metadata:
  name: strapi-mongodb
  namespace: strapi
spec:
  image: mongo:4.4.4-bionic
  workloadType: server
  replicas: 1
  env:
  - name: MONGO_INITDB_ROOT_USERNAME
    type: static
    value: admin
  - name: MONGO_INITDB_ROOT_PASSWORD
    type: static
    value: admin
  - name: MONGO_INITDB_DATABASE
    type: static
    value: strapi
  ports:
  - containerPort: 27017
    protocol: tcp
    servicePort: 27017
  resourceRequirements:
    limits:
      cpu: 200m
      memory: 128Mi
    requests:
      cpu: 200m
      memory: 128Mi
  volumes:
  - path: /data/db
    size: 2Gi
    storageClassName: gp2
    type: pvc
```

Let's walk through some key points here.

We use image: `mongo:4.4.4-bionic` to run our DB instance:

```yaml
spec:
  image: mongo:4.4.4-bionic
```

and we initialized the database using these Environment variables:

```yaml
spec:
  ...
  env:
  - name: MONGO_INITDB_ROOT_USERNAME
    type: static
    value: admin
  - name: MONGO_INITDB_ROOT_PASSWORD
    type: static
    value: admin
  - name: MONGO_INITDB_DATABASE
    type: static
    value: strapi
```

We exposed the db service at port: `27017`:

```yaml
  ports:
  - containerPort: 27017
    protocol: tcp
    servicePort: 27017
```

We also asked for a 2Gi disk for our database:

```yaml
  volumes:
  - path: /data/db
    size: 2Gi
    storageClassName: gp2
    type: pvc
```

:::note
The storageClassName (gp2) displayed in this demo is for EKS. This name is provided by AWS. For a different platform this name will be different, please update the field accordingly. (For GCP it is pd-ssd)
:::

# Deploy Strapi

The YAML for Strapi is quite similar:

```yaml
apiVersion: core.kalm.dev/v1alpha1
kind: Component
metadata:
  name: strapi
  namespace: strapi
spec:
  image: strapi/strapi:3.5.2-node12-alpine
  workloadType: server
  replicas: 1
  env:
  - name: DATABASE_CLIENT
    type: static
    value: mongo
  - name: DATABASE_HOST
    type: static
    value: strapi-mongodb
  - name: DATABASE_NAME
    type: static
    value: strapi
  - name: DATABASE_USERNAME
    type: static
    value: admin
  - name: DATABASE_PASSWORD
    type: static
    value: admin
  - name: DATABASE_PORT
    type: static
    value: "27017"
  ports:
  - containerPort: 1337
    protocol: http
    servicePort: 1337
  volumes:
  - path: /srv/app
    size: 2Gi
    storageClassName: gp2
    type: pvc
  resourceRequirements:
    limits:
      cpu: 500m
      memory: 512Mi
    requests:
      cpu: 500m
      memory: 512Mi
```

:::note
- update the ENVs if your db configuration is different
- update the storageClassName again if you are on a different cloud platform
:::

# Setup HTTPRoute

Finally let's setup the HTTP route for our Strapi service:

```yaml
apiVersion: core.kalm.dev/v1alpha1
kind: HttpRoute
metadata:
  name: http-route-strapi
spec:
  destinations:
  - host: strapi.strapi.svc.cluster.local:1337
    weight: 1
  hosts:
  - strapi.UPDATE-THIS.clusters.kalm-apps.com
  httpRedirectToHttps: true
  methods:
  - GET
  - POST
  - PUT
  - PATCH
  - DELETE
  - HEAD
  - OPTIONS
  - CONNECT
  - TRACE
  paths:
  - /
  schemes:
  - http
  - https
```

:::note
You will need to update your domain for the field: `spec.hosts`.
:::

Some key points:

We route the traffic to the service at `strapi.strapi.svc.cluster.local:1337`:

```yaml
spec:
  ...
  destinations:
  - host: strapi.strapi.svc.cluster.local:1337
    weight: 1
```

The destination is the strapi component we just defined above.

We set our domain in the `spec.hosts` field:

```yaml
spec:
  ...
  hosts:
  - strapi.UPDATE-THIS.clusters.kalm-apps.com
```

HTTPs is ready for clusters initialized by Kalm, so we enable the HTTPS redirect option:

```yaml
  httpRedirectToHttps: true
```

## Try it out

Go into Kalm, and find your application. Check if your Strapi service is up now. If everything works as expected, you should see a green light on the page:

![pod-green](assets/strapi-pod-green.jpg)

Now visit the domain you just configured (you can also find this on the Routes tab) and you should see the admin page is up and running:

![strapi-admin](assets/strapi-admin.jpg)

## Clean Up

To delete your work here, simply delete the app within the Kalm dashboard. To delete the DB disk, go to the Disks page, and delete the disk there.
