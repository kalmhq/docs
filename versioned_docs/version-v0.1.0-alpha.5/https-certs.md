---
title: HTTPS Certificates
---

## Overview

To enable HTTPS access to your applications, you need a certificate from a Certificate Authority. Kalm can help you create new certificate via Let's Encrypt, or hook up existing ones. Domains with certificates managed by Kalm can be easily routed to any container on your cluster.

## Automated Certificates with Let's Encrypt

- Click **Certificates** in the Navigation Sidebar
- Click **New Certificate**
- The Certificate Creation page displays your cluster IP. You need to point domains you want to configure to this cluster IP by adding an A Record. _(Specific instructions depend on your domain provider)_

* Enter a **Certificate Name**
* Enter one or more domains in the **Domains** field. You should get an indicator next to each domain which specifies if the IP is properly configured. If you get a warning symbol, please check your DNS configurations. (DNS records can sometimes take a few moments to update)
* Click **Create** to create your certificate

![Create Cert](assets/create-certificate.png)

## Upload Existing Certificate

If you want to use an existing certificate, click **Use an existing certificate** and paste your Certificate and Private Key.

![Upload Cert](assets/existing-certificate.png)

## Additional Instructions

### Using Certified Domains in Routes

Domains which have certificates properly configured can be used in Routes to handle HTTPs traffic. See the [Routes Guide](/) _(coming soon!)_ for more details.

![Routes HTTPS](assets/routes-and-certs.png)

The screenshot above shows that "test" domain can be used in Routes because we have a certificate created for it. However, the "random" domain does not have a certificate, so it displays a warning flag.

### Wildcard Certificates

We have plans to support wildcard certificates in the near future, and can suggest workarounds in the mean time. Email david@kalm.dev if you need this.
