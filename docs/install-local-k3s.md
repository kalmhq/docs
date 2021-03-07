---
title: "Install Kalm On K3s"
---

## Install K3s on Mac

K3s is the lightweight Kubernetes distribution, it's natively available for Linux, so we need install a [multipass](https://multipass.run/) to install it on Mac.

```
❯ brew install --cask multipass
❯ multipass version
multipass  1.6.2+mac
multipassd 1.6.2+mac
```

Now create a VM with multipass, assuming 2GB memory and 10GB disk.

```
❯ multipass launch --name k3sVM --mem 2G --disk 5G
Creating k3sVM -
Launched: k3sVM
```

Wait for the VM created, then open a shell to the VM

```
❯ multipass shell k3sVM
Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 5.4.0-66-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Fri Feb 26 03:49:55 CST 2021

  System load:  0.0               Processes:               107
  Usage of /:   26.7% of 4.67GB   Users logged in:         0
  Memory usage: 9%                IPv4 address for enp0s2: 192.168.64.9
  Swap usage:   0%

1 update can be installed immediately.
0 of these updates are security updates.
To see these additional updates run: apt list --upgradable

To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

ubuntu@k3sVM:~$
```

## Install K3s and Create Cluster

and then install k3s, please install k3s with flag `—write-kubeconfig-mode`, it will make your first Kubernetes life easier, more detail please [check here](https://github.com/k3s-io/k3s/issues/389#issuecomment-503616742).

```
ubuntu@k3sVM:~$  curl -sfL https://get.k3s.io | sh -s - --write-kubeconfig-mode 644
[INFO]  Finding release for channel stable
[INFO]  Using v1.20.4+k3s1 as release
[INFO]  Downloading hash https://github.com/rancher/k3s/releases/download/v1.20.4+k3s1/sha256sum-amd64.txt
[INFO]  Skipping binary downloaded, installed k3s matches hash
[INFO]  Skipping /usr/local/bin/kubectl symlink to k3s, already exists
[INFO]  Skipping /usr/local/bin/crictl symlink to k3s, already exists
[INFO]  Skipping /usr/local/bin/ctr symlink to k3s, already exists
[INFO]  Creating killall script /usr/local/bin/k3s-killall.sh
[INFO]  Creating uninstall script /usr/local/bin/k3s-uninstall.sh
[INFO]  env: Creating environment file /etc/systemd/system/k3s.service.env
[INFO]  systemd: Creating service file /etc/systemd/system/k3s.service
[INFO]  systemd: Enabling k3s unit
Created symlink /etc/systemd/system/multi-user.target.wants/k3s.service → /etc/systemd/system/k3s.service.
[INFO]  systemd: Starting k3s
ubuntu@k3sVM:~$ kubectl get nodes
NAME    STATUS   ROLES                  AGE   VERSION
k3svm   Ready    control-plane,master   14m   v1.20.4+k3s1
```

and then we can start install kalm

```
git clone https://github.com/kalmhq/kalm.git
cd kalm

# run the install script
./scripts/install-local-mode.sh

Initializing Kalm - 4/4 modules ready:

✔ kalm-operator
✔ cert-manager
✔ istio-system
✔ kalm-system
Kalm Installation Complete! 🎉

To start using Kalm, open a port via:

kubectl port-forward -n kalm-system $(kubectl get pod -n kalm-system -l app=kalm -ojsonpath="{.items[0].metadata.name}") 3010:3010

Then visit http://localhost:3010 in your browser
```

Kalm has installed success! Now let's access kalm via web browser.

Please open another terminal

```
❯ multipass info k3sVM
Name:           k3sVM
State:          Running
IPv4:           192.168.64.9
                10.42.0.0
                10.42.0.1
Release:        Ubuntu 20.04.2 LTS
Image hash:     c5f2f08c6a1a (Ubuntu 20.04 LTS)
Load:           0.61 1.56 2.47
Disk usage:     3.5G out of 4.7G
❯ K3S_IP=$(multipass info k3sVM | grep IPv4 | awk '{print $2}')
❯ echo $K3S_IP
192.168.64.9
```

update your mac's `/etc/hosts`

```
❯ grep kalm /etc/hosts
192.168.64.9 kalm.local
```

```
# export `kubeconfig` file
❯ multipass exec k3sVM sudo cat /etc/rancher/k3s/k3s.yaml > k3s.yaml
❯ cat k3s.yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUJkakNDQVIyZ0F3SUJBZ0lCQURBS0JnZ3Foa2pPUFFRREFqQWpNU0V3SHdZRFZRUUREQmhyTTNNdGMyVnkKZG1WeUxXTmhRREUyTVRReU9ESTJOVEl3SGhjTk1qRXdNakkxTVRrMU1EVXlXaGNOTXpFd01qSXpNVGsxTURVeQpXakFqTVNFd0h3WURWUVFEREJock0zTXRjMlZ5ZG1WeUxXTmhRREUyTVRReU9ESTJOVEl3V1RBVEJnY3Foa2pPClBRSUJCZ2dxaGtqT1BRTUJCd05DQUFSK2hmMDJXYWdYMVNERUk1QjRsS0l5bDluNndiNXlhSFdaR20yTndFaXIKREJsemsrVFluT1NSdzlkL2twc1oycXZTY3FkSXNoRExFZVA2V21iR0RsUkFvMEl3UURBT0JnTlZIUThCQWY4RQpCQU1DQXFRd0R3WURWUjBUQVFIL0JBVXdBd0VCL3pBZEJnTlZIUTRFRmdRVXNaZjNUd2tHSU5vVWx2VERnRjA3CjVUcDh6RU13Q2dZSUtvWkl6ajBFQXdJRFJ3QXdSQUlnR0d0MUV1Uk1TSmVGWjhvRkE4SEV1ZUNmYVZEaS90b2cKMmY0NzlrTWd1Y01DSUZhUmxzWHZ1T09MWUVjUFI1N0treHdDV0RXTWhZRzY1MWZoWW1mYUVyNGYKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=
    server: https://127.0.0.1:6443
  name: default
contexts:
- context:
    cluster: default
    user: default
  name: default
current-context: default
kind: Config
preferences: {}
users:
- name: default
  user:
    client-certificate-data: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUJrakNDQVRlZ0F3SUJBZ0lJT0ZZTWxPNmVPN3d3Q2dZSUtvWkl6ajBFQXdJd0l6RWhNQjhHQTFVRUF3d1kKYXpOekxXTnNhV1Z1ZEMxallVQXhOakUwTWpneU5qVXlNQjRYRFRJeE1ESXlOVEU1TlRBMU1sb1hEVEl5TURJeQpOVEU1TlRBMU1sb3dNREVYTUJVR0ExVUVDaE1PYzNsemRHVnRPbTFoYzNSbGNuTXhGVEFUQmdOVkJBTVRESE41CmMzUmxiVHBoWkcxcGJqQlpNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQTBJQUJQbXpZMkYwYzg5OHg3U3cKU3FTa2xCREJNcHJPb1JCM214eHo5TGRLRlZDRDlscWMwR1dtOXRnSVFRM1docmZtWkFUSGxjYjlTWUhqdEQwQwoyQnY2VlN1alNEQkdNQTRHQTFVZER3RUIvd1FFQXdJRm9EQVRCZ05WSFNVRUREQUtCZ2dyQmdFRkJRY0RBakFmCkJnTlZIU01FR0RBV2dCUXVsanZKQkNvYjcvRnRZRTlWTDJrY2Z0ZDluakFLQmdncWhrak9QUVFEQWdOSkFEQkcKQWlFQW5yWWZHQmFlaEhZNll3d3NpOG8wVlNCT1NMVGRLeXYvNUVwa21QcStZVjhDSVFEVUpnKzl4d1lMSXVnaQpKblh5ZGdzQzJqWlFQanJpNlNJTnl1NlRlUE44VUE9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCi0tLS0tQkVHSU4gQ0VSVElGSUNBVEUtLS0tLQpNSUlCZGpDQ0FSMmdBd0lCQWdJQkFEQUtCZ2dxaGtqT1BRUURBakFqTVNFd0h3WURWUVFEREJock0zTXRZMnhwClpXNTBMV05oUURFMk1UUXlPREkyTlRJd0hoY05NakV3TWpJMU1UazFNRFV5V2hjTk16RXdNakl6TVRrMU1EVXkKV2pBak1TRXdId1lEVlFRRERCaHJNM010WTJ4cFpXNTBMV05oUURFMk1UUXlPREkyTlRJd1dUQVRCZ2NxaGtqTwpQUUlCQmdncWhrak9QUU1CQndOQ0FBVGpLZFBUTXhDYWxtV0VrYnQrNjlCNldQZENORXVHWENiS2p0MFhPU0RFCnZRRFd6S1dENWRpSmRyMjNIOXZneFVyMExQeWxiVEY1c2tGYUVLREJBK3RLbzBJd1FEQU9CZ05WSFE4QkFmOEUKQkFNQ0FxUXdEd1lEVlIwVEFRSC9CQVV3QXdFQi96QWRCZ05WSFE0RUZnUVVMcFk3eVFRcUcrL3hiV0JQVlM5cApISDdYZlo0d0NnWUlLb1pJemowRUF3SURSd0F3UkFJZ1RqL0prY2tEMWczMUJFblYydXNFZHVyc2swcGVjMVFBCmhPV3dYRUp1clFnQ0lIall5SWk3ZDVLeCtoUDJISTJqVzBDa0ZFU2prRXp4T2RMQ1AvMVh0bUNTCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K
    client-key-data: LS0tLS1CRUdJTiBFQyBQUklWQVRFIEtFWS0tLS0tCk1IY0NBUUVFSUNaMmpaU3JEYVo3VUVCN2xlajdncUdRSDZtVFpMdW5GanVFdlYrQ05UV2hvQW9HQ0NxR1NNNDkKQXdFSG9VUURRZ0FFK2JOallYUnp6M3pIdExCS3BLU1VFTUV5bXM2aEVIZWJISFAwdDBvVlVJUDJXcHpRWmFiMgoyQWhCRGRhR3QrWmtCTWVWeHYxSmdlTzBQUUxZRy9wVkt3PT0KLS0tLS1FTkQgRUMgUFJJVkFURSBLRVktLS0tLQo=

```

replace `[https://127.0.0.1:6443](https://127.0.0.1:6443)` to

```
❯ sed -i '' "s/127.0.0.1/${K3S_IP}/" k3s.yaml
```

test from mac access k3sVM cluster

```
❯ export KUBECONFIG=${PWD}/k3s.yaml
❯ kubectl get nodes
NAME    STATUS   ROLES                  AGE    VERSION
k3svm   Ready    control-plane,master   105m   v1.20.4+k3s1
```

now we can open kalm in web browser

```
kubectl port-forward -n kalm-system $(kubectl get pod -n kalm-system -l app=kalm -ojsonpath="{.items[0].metadata.name}") 3010:3010
```

open [http://localhost:3010/applications](http://localhost:3010/applications) in browser
