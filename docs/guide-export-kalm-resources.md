---
title: Export KALM resources
---

Sometimes we need to export an application, and reinstall it on another cluster. This is the way to export resource from KALM.

## Prerequisites

- Make sure KALM installed to your cluster.
- Make sure you have ***kubectl*** and configure to your cluster.

### Export & import an application

Run the command as follow, a resource file that describe the application will be created *$KALM_APP_NAME.bak.yaml*

```
$ export KALM_APP_NAME=<name_of_exporting_applaction>
$ curl https://raw.githubusercontent.com/kalmhq/kalm/add_script_to_export_kalm_resources/scripts/export-resources.sh > export-resources.sh ; bash export-resources.sh $KALM_APP_NAME $KALM_APP_NAME.bak.yaml
```

Run the command as follow in another KALM (make sure that there is no application with the same name in KALM, otherwise there will be conflicts when import application), and the application you export will be imported in a few minutes.

```
$ kubectl apply -f $KALM_APP_NAME.bak.yaml
```

### Migrate from one KALM to another

1. Prepare a new KALM. https://kalm.dev/docs/install
2. Export all resource from old KALM
3. Import all resource to new KALM

Run the following command to export all resource from old KALM.

```
$ curl https://raw.githubusercontent.com/kalmhq/kalm/add_script_to_export_kalm_resources/scripts/export-resources.sh > export-resources.sh ; bash export-resources.sh all-application kalm.bak.yaml
```

Run the following command to import all resource to new KALM (make sure in your new cluster, there is no application with the same name as the old cluster).
*Persistent data will not be migrated such as postgresql data and some file that you mount on disks. If you want to migrate these data, you should through your own customized way.

```
$ kubectl apply -f kalm.bak.yaml
```
