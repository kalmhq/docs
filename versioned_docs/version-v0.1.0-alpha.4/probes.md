---
title: Health Checking Probes
---

Kubernetes Liveness and Readiness probes are useful for checking the health of pods. Readiness probes determine if a pod is ready to receive traffic, and Liveness probes signals if a pod's containers should be restarted.

Both liveness and readiness probes support a variety of action types to determine if something is healhty:

- HTTP: Healthy means a request to some specified HTTP endpoint returned a response between 200 to 399
- Command: - Healhty means a command executed successfully (return code 0)
- TCP: Healthy means a specific TCP socket was successfully opened

## Liveness Probe Example

Let's go through an example of a liveness probe implemented via a command

- Create a new application
- Create a new component, with `busybox` as image
- Add the command `/bin/sh -c 'touch /tmp/healthy; sleep 10000'`

This creates a file upon startup, in this case representing the health of our Component.

- Click the 'Health' Tab
- Select `Command` from the Liveness Probe dropdown.
- Enter `cat /tmp/healthy` as the command

The `cat` command will execute successfully if the file exists.

- Decrease the number of consequtive tests from `3` to `1`. This will save us some time to see the results
- Click **Deploy Component**

The pod should spin up successfully. Now let's delete the file by opening a shell.

```
rm /tmp/healthy
```

Within 20 seconds, the Terminal will become disconnectd because the container is deleted. Go back to the Component view, and you will see the number of Restarts increase from 0 to 1.

By restarting the pod, the "problem" of the missing /tmp/healthy is fixed, as the file is created by the startup command. This demonstrates the purpose of the livenessProbe: triggering automatic restarts in an attempt to fix problematic pods.

## Readiness Probe Example

Readiness Probes are very similar. Let's create one with an HTTP action.

- Create a new component with `quay.io/openshiftlabs/simpleservice:0.5.0` as the image
- In the **Networking** tab, Add a port named `healthport` with Container Port set to `9876`
- In the \*\*Health Tabcreate a HTTP liveness probe with `/health` and `9876` for the port

The pod should be ready according to the probe.

The image we are using allows us to insert an [artificial delay to /health](https://github.com/mhausenblas/simpleservice#changing-runtime-behaviour) by adding an environment variable:

- add an environment variable `HEALTH_MAX` with the value `5000` which means there's a 5 second delay for the timeout

Probe should Now fail

- Remove the environment variable, and the probe should start working again.
