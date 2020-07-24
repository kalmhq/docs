---
title: Health Probes
---

Intro - probes are useful. Let's see how to set one up.

## Command Probe

- Create a new application
- Create a new component, with `busybox` as image
- Add the command `/bin/sh -c 'touch /tmp/healthy; sleep 60; rm -rf /tmp/healthy; sleep 600'`
  What this does is create a file that represents a healthy container, then delete it (representing unhealthy).

Of course so far, there's no health probe setup, and the container is healthy as long as it is up and running. Next we will add a health probe to check for this file

- Click the 'Health' Tab
- Select `command` probe, enter `cat /tmp/healthy`

This is a simple command that will succeed if the file exists, and fail otherwise.

## HTTP Probe

- Create a new component with `quay.io/openshiftlabs/simpleservice:0.5.0` as the image
- open a port 9876 called health
- create a HTTP liveness probe with `/health` and `9876` for the port

The pod should be healthy

- add an environment variable `HEALTH_MAX` with the value `4000` which means there's a 4 second delay for the timeout

Probe should fail

- extend probe timing to 10 seconds

Probe should succeed
