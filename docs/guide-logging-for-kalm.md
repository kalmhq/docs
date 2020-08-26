---
title: Logging System
---

For production environment, the features of container level log is obviously not enough. Usually, we need a logging system to collection, pipeline, query, analysis logs. Viewing the log aggregated at the entire cluster level is a common requirement. KALM provide a simple solution out of the box called logging system.

EFK (Elasticsearch) and PLG (Loki) are the most popular logging system of the moment. They have their own advantages. Kalm plans to support them both.

## Using PLG (Promtail + Loki + Grafana)

The key component in this stack is Loki. Loki has a set of components which are internally referred to as modules. Each component spawns a gRPC server for internal traffic and an HTTP/1 server for external API requests.

There are two ways to deploy Loki, monolithic mode and microservices mode.

### Monolithic mode (single process mode)

Monolithic mode (single process mode) is ideally suited for local development, small workloads, and for evaluation purposes.

#### Prerequisites

- Make sure KALM installed to your cluster.
- Make sure you have ***kubectl*** and configure to your cluster.
- Make sure your cluster has at least 500m cpu and 800Mi memory (each node has at least 100m cpu and 100Mi) to install PLG.

#### Install PLG on KALM

Run the following command to install monolithic mode plg. In the future, this step will be able to be done through web interface.

```bash
kubectl apply -f - <<EOF
apiVersion:  v1
kind: Namespace
metadata:
  name: my-first-log-app
  labels:
    istio-injection: enabled
    kalm-enabled: "true"
---
apiVersion: core.kalm.dev/v1alpha1
kind: LogSystem
metadata:
  name: plg
  namespace: my-first-log-app
spec:
  stack: plg-monolithic
  plgConfig:
    loki:
      retentionDays: 7
      diskSize: 1Gi
      storageClass: standard
      image: grafana/loki:1.6.0
    grafana:
      image: grafana/grafana:6.7.0
    promtail:
      image: grafana/promtail:1.6.0
EOF
```

#### View & Query logs

```bash
kubectl -n my-first-log-app port-forward $(kubectl get pods -n my-first-log-app -l app=grafana -o jsonpath="{.items[].metadata.name}") 3000:3000

```

Open [http://localhost:3000](http://localhost:3000/login) in browser, and go to explore page. You can use label to filter logs you want. The query language here is called [LogQL](https://github.com/grafana/loki/blob/v1.5.0/docs/logql.md).

Let's view grafana log for demo by visiting [this link](http://localhost:3000/explore?orgId=1&left=[%22now-1h%22,%22now%22,%22Loki%22,{%22expr%22:%22{job=\%22loki/grafana\%22}%22},{%22mode%22:%22Logs%22},{%22ui%22:[true,true,true,%22none%22]}]).

:::note
Don't worry about the permission. As long as you don't give it a route, it will be only accessible locally with port-forward. External access with permissions is under development.
:::

![guide-logging-for-kalm3.png](assets/guide-logging-for-kalm3.png)

### Microservices mode

:::note
Working in progress.
:::

## Using EFK (Elasticsearch + Filebeat + Kibana)

:::note
Working in progress.
:::
