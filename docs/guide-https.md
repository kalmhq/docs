---
title: Setup HTTPS Certificates
---

Plugins is the core feature, which make kapp so different from using original k8s. A plugin will combine lots of work together to give the user maximum convenience to achieve some heavy tasks. The artical will introduce each plugin in details.

# External Access

#16

# Logs

possible solutions

- ELK (filebeat + logstash + kibana)
- Prometheus Loki https://grafana.com/oss/loki/
- https://fluentbit.io/ 和 ELK 的思路特别类似，output 也支持 elastic-search

我们在 ddex 用的那种方式（filebeat -> redis -> logstash -> files in PersistentVolume，再通过 PV 所在机器直接访问文件），主要是最后一步不好处理：如何提供方便的方法让用户访问 PV 里的文件。
