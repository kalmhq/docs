---
title: Deploy Another Wordpress in 3-Minute
---

![Wordpress with Kubernetes](assets/wp-tut-0.jpeg)

When you try to run a wordpress with kubernetes,it's just like you drive a gaint truck was loaded with only one brick. There are lots of concepts and bunch of config files you need to know and handle. But now, you can easy with kalm, let's install just another wordpress site in 3 minutes!

## Create New Application

- open [dashboard](https://dashboard.kapp.live/applications/new) and enter application name
- we use `another-blog` in this tutorial

![Create new application](assets/wp-tut-1.png)

## Add Database Component

### Basic Information

- name: `wordpress-mysql`
- image: `mysql:5.6`

### Configurations

- environment variables
  - `MYSQL_ROOT_PASSWORD` : `mysql-pass`

![Add Database Component 1](assets/wp-tut-2.png)

### Networking

- Expose ports to cluster
  - Name : `mysql`
  - Container Port : `3306`

![Add Database Component 2](assets/wp-tut-3.png)

### Disks

- Add Disks
  - Click `+ Add`
  - Type : `Create and mount disk`
  - Mount path : `/var/lib/mysql`
  - Storage class : `Kalm-HDD`
  - Size : `1Gi`

![Add Database Component 3](assets/wp-tut-4.png)

Database will be done soon, let's go on next step.

## Add Wordpress Component

### Basic Information

- name: `wordpress`
- image: `wordpress`

### Configurations

- environment variables
  - `MYSQL_ROOT_HOST` : `wordpress-mysql`
  - `MYSQL_ROOT_PASSWORD` : `mysql-pass`

![Add Database Component 3](assets/wp-tut-5.png)

### Networking

- Expose ports to cluster
  - Name : `http`
  - Container Port : `80`

![Add Database Component 2](assets/wp-tut-6.png)

### Disks

- Add Disks
  - Click `+ Add`
  - Type : `Create and mount disk`
  - Mount path : `/var/www/html`
  - Storage class : `Kalm-HDD`
  - Size : `1Gi`

![Add Database Component 3](assets/wp-tut-7.png)

## Add Route

- open [Routes](https://dashboard.kapp.live/applications/another-blog/routes/new) and click `Add New Route`
  - Hosts : using your own domain or just click ingress ip quick action which under the input field.
  - Targets: select `wordpress:80` on dropdown menu from `choose a target`
  - click `Add Route`

![Add Database Component 3](assets/wp-tut-8.png)

## Rock it!

After a few seconds, you can see all components work well, the badge should be green.

![Add Database Component 3](assets/wp-tut-9.png)

then you can open and play with your another wordpress site!

![Add Database Component 3](assets/wp-tut-10.png)
