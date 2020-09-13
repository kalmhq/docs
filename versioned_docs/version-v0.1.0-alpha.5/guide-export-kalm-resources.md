---
title: Import / Export
---

:::info
This is a temporary solution, Kalm will provide better import and export functions soon.
:::

Sometimes you need to export an application and reinstall it on another cluster. We'll walk you through how to export resources from KALM.

## Prerequisites

- Make sure KALM is installed on your cluster.
- Make sure you have ***kubectl*** and it is configured to your cluster.

### Export & import an application

Run the following command. A resource file that describes the application will be created *$KALM_APP_NAME.bak.yaml*

```bash
export KALM_APP_NAME=<name_of_exporting_applaction>
curl https://raw.githubusercontent.com/kalmhq/kalm/add_script_to_export_kalm_resources/scripts/export-resources.sh > export-resources.sh ; bash export-resources.sh $KALM_APP_NAME $KALM_APP_NAME.bak.yaml
```

Now run the following command in another instance of KALM (make sure that there is no application with the same name in KALM, otherwise there will be conflicts when importing application). 

```bash
kubectl apply -f $KALM_APP_NAME.bak.yaml
```

The application you exported will be imported to your other Kalm instance within a few minutes.

### Migrate from one KALM to another

1. Prepare a new KALM. https://kalm.dev/docs/install
2. Export all resources from the old KALM
3. Import all resources to the new KALM

Run the following command to export all resources from old KALM.

```bash
curl https://raw.githubusercontent.com/kalmhq/kalm/add_script_to_export_kalm_resources/scripts/export-resources.sh > export-resources.sh ; bash export-resources.sh all-application kalm.bak.yaml
```

Run the following command to import all resources to the new KALM (make sure in your new cluster, there is no application with the same name as the old cluster).
*Persistent data will not be migrated such as postgresql data and some file that you mount on disks. If you want to migrate these data, you should through your own customized way.

```bash
kubectl apply -f kalm.bak.yaml
```
