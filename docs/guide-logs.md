---
title: View Container Logs
---

Sometimes its useful to view the log output of a particular container. Kalm provides a view to quickly view logs in the web:

![log button](assets/log-button.png)

## Example Container Setup

Let's create a container that logs output every second. Create a New Application, then Add a single Component named **logviewer** with the image set to **busybox**.

In the **Command** input box, enter the following command, which outputs a timestamp every second:

```
/bin/sh -c 'i=0; while true; do echo "$i: $(date)"; i=$((i+1)); sleep 1; done'
```

![log component](assets/log-component.png)

Click **Deploy** to instiatiate the component container.

After deployment is complete, click the _Log Icon_:

![log button example](assets/log-button-example.png)

<br>
You should see the Log View:
![log view](assets/log-view.png)
