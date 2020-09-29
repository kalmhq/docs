---
title: Certificate Issuing
---

## Overview

Kalm can help you create certificate via Let's Encrypt. This article provides an overview of how certificates are obtained, and the extra steps necessary to obtain and automatically renew **wildcard** certificates.

## Obtaining a (non-wildcard) certificate

When requesting a certificate from Let's Encrypt, you must complete a "challenge" to prove that you are in control of the domain(s) to be certified. There are multiple types of challenges. Typically we can just use **HTTP-01**, which is the most common and the simplest challenge type.

### HTTP-01

Let's Encrypt generates a random token, which you must serve at a specific url:

```
http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>
```

This proves that you have permission to serve files(and is therefore in control of) <YOUR_DOMAIN>

### How it works in Kalm

Kalm automates most of the process, all you have to do is point <YOUR_DOMAIN> to the IP of the Kalm cluster. For example, if <YOUR_DOMAIN> is **myapp.com** and the cluster IP is **34.84.45.1**, you would add the following DNS record.

| Type | Host      | Answser    |
| ---- | --------- | ---------- |
| A    | myapp.com | 34.84.45.1 |

Then you can initiate the certificate obtaining process in the Kalm UI by following [this guide](https-certs).

## Obtaining a wildcard certificate

In theory, obtaining a wildcard certificate is similar to a normal certificate in that you have to complete a challenge to prove you have control over the domain. However, Let's Encrypt doesn't let you use HTTP-01 challenge to issue wildcard certificates. You must instead complete a **DNS-01** challenge.

### DNS-01

The DNS-01 challenge asks you to put a specific value in a TXT record under the domain name you are trying to certify.

| Type | Host                       | Answser        |
| ---- | -------------------------- | -------------- |
| TXT  | \_acme-challenge.myapp.com | <RANDOM_TOKEN> |

To complete the challenge, you could manually add such an entry to your DNS provider. However, you won't be able to automatically renew the certificate.

To re-iterate, HTTP-01 and DNS-01 challenge both involving putting a random token somewhere. HTTP-01 is easier to automate because it involves putting the token on a machine you control. DNS-01 is harder because it involves putting the token in a DNS record, which is often not automatable because your DNS provider may not have a standard API.

### Solution: proxy server

Suppose we submit a certificate request for: `*.example.com`. After submit this first wildcard certificate request at Kalm dashboard, Kalm will start a DNS server, in order to make the DNS server publicly known. Two things need to be done:

1. choose domains for our DNS server to be accessed publicly.
2. configure the chosen domains at your DNS provider.

to keep the workflow simple, Kalm finishes the first thing by auto picking up 2 random sub-domains for the newly started DNS service based on the domain in the cert. of course, you can update the domains if you like. below, I update the domains to make it easier for read:

| Domain           | Description                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ns.example.com   | this is the domain for our DNS server.                                                                                                                                                                            |
| acme.example.com | sub-domains like `b6e4682c-5109-4a34-ac99-d5097d5b2b68.acme.example.com` will be generated based on this one, and our DNS server will serve the TXT DNS record on these sub-domains to pass the DNS-01 challenge. |

![pic with acme-server config](./assets/acme-dns-server-config.png)

to finish the second thing, you need to add 2 DNS records at your dns provider:

| Type | Name             | Content        |
| ---- | ---------------- | -------------- |
| A    | ns.example.com   | 34.84.45.1     |
| NS   | acme.example.com | ns.example.com |

basically these two records are saying:

- I have a dns server `ns.example.com` located at given IP (the A record).
- and it's responsible to answer all the DNS queries for the domain: `acme.example.com` and all it's sub-domains: `*.acme-random.example.com`.

Now, we have setup a DNS server and it is ready to pass the DNS-01 challenges.

For the wildcard certificate we submit at the beginning, Kalm will generate a unique address to answer the DNS challenge, as the pic showed below:

![pic with domain for wildcard cert](./assets/wildcard-cert.png)

The warning status in picture showed us:

> please add an CNAME record with your dns provider, **example.com** CNAME **b6e4682c-5109-4a34-ac99-d5097d5b2b68.acme.example.com**

We need add a CNAME DNS record at our DNS provider now:

| Type  | Name                             | Content                                               |
| ----- | -------------------------------- | ----------------------------------------------------- |
| CNAME | **\_acme-challenge.example.com** | b6e4682c-5109-4a34-ac99-d5097d5b2b68.acme.example.com |

The CNAME record is just saying: go to our dns server to get the TXT DNS record for the DNS-01 challenge, and

When Let’s-Encrypt checks if we have meet the challenge it proposed, for domain:`example.com`, Let’s-Encrypt will look for TXT DNS record for `_acme-challenge.example.com`. as we have add the CNAME record for the domain, it will follow the CNAME and go to `b6e4682c-5109-4a34-ac99-d5097d5b2b68.acme.example.com`, as Kalm orchestrates the cert-manger and the dns server, the TXT record is properly set there. After Let's-Encrypt find the match, the challenge is passed and the certificate will be issued.

After issuing the cert, keep the DNS records at your dns provider, so that kalm can auto renew the certificates before it expire in the future.

#### Wildcard Cert Issuing Flow

![](./assets/acme-dns-flow.svg)
