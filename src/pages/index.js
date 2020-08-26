import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Open Source</>,
    imageUrl: "img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        Kalm is free and open source. Deploy on your cluster trustlessly.
        Modifiable to fit your requirements.
      </>
    ),
  },
  {
    title: <>Works with any Kubernetes cluster</>,
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Works with Minikube, GKE, AKE, MKE, Digital Ocean, Aliyun and more. Kalm
        installs all the necessary dependencies for common usecases and works
        out of the box.
      </>
    ),
  },
  {
    title: <>For Developers</>,
    imageUrl: "img/undraw_docusaurus_react.svg",
    description: (
      <>Built for developers, by developers. Full time DevOps not required.</>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {/* {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )} */}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

const FeatureSection = (props) => {
  return (
    <div class={clsx("row", styles.featureRow)}>
      <div class="col col--6">
        <h3>{props.title}</h3>
        {props.desc}
      </div>
      <div class="col col--6">
        <img src={useBaseUrl(props.image)} alt={props.title} />
      </div>
    </div>
  );
};

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      // title={`${siteConfig.title}`}
      description="the easiest way to manage kubernetes"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">The Easiest Way to Manage Kubernetes</h1>
          <p className="hero__subtitle">
            Stop struggling with yml files. Manage your application deployment
            on k8s with an intuitive interface made for developers.
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              Try it now
            </Link>
          </div>
        </div>
      </header>

      <div class="container">
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="div">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}

        <FeatureSection
          desc="Kalm provides an intuitive web interface for performing common tasks including App configuration, scaling, routing, auto-healing, and job scheduling."
          title="Easily Create and Update Applications"
          image="img/kalm_start2x_gif.gif"
        />
        <FeatureSection
          desc={
            <>
              Kalm is built on <Link to="https://istio.io/">Istio</Link>. With
              its power, you can easily manage the traffic entering the cluster.
              You can get many ingress functions immediately, such as Request
              Routing, Error Injection, Mirroring Traffic, Traffic Shifting,
              etc.
            </>
          }
          title="Powerful Ingress"
          image="img/Configs3.svg"
        />
        <FeatureSection
          desc={
            <>
              Kalm uses <Link to="https://github.com/dexidp/dex">dex</Link>,
              which allows you to use your existing employee account system
              (such as github, gitlab) to seamlessly use the entire kubernetes
              cluster. kalm provides RBAC mode and application-level access
              control.
            </>
          }
          title="Built-in Single Sign-On"
          image="img/Configs3.svg"
        />
        <FeatureSection
          desc={
            <>
              Kalm uses{" "}
              <Link to="https://cert-manager.io/docs/">Cert Manager</Link>. Kalm
              can help you apply for an https certificate from{" "}
              <Link to="https://letsencrypt.org/">Let's Encrypt</Link> at any
              time, and automatically renew it for you. Currently supports
              specific domain name certificates (using http01 Challenge), and
              wildcard certificates will be supported soon.
            </>
          }
          title="Fully automatic certificate hosting"
          image="img/Configs3.svg"
        />
        <FeatureSection
          desc={
            <>
              Log collection within the cluster is a common requirement. Kalm
              has built-in log system construction, you only need to fill in a
              small amount of configuration, you can get a pretty good log
              collection system, and support you to further customize. Provides
              multiple options for you to choose, such as{" "}
              <Link to="https://grafana.com/oss/loki/">Loki(PLG stack)</Link>,{" "}
              <Link to="https://www.elastic.co/what-is/elk-stack">ELK</Link>
              (under development) .
            </>
          }
          title="Logging function out of the box"
          image="img/Configs3.svg"
        />
        <FeatureSection
          desc="Kalm doesn't explicity depend on platform specific features. You can use Kalm on any kubernetes cluster, including Amazon EKS, Google Kubernetes Engine, Digital Ocean Kubernetes Cluster, and minikube. Take Kalm with you if you need to migrate from one platform to another."
          title="Work with all clusters"
          image="img/Configs3.svg"
        />
        <FeatureSection
          desc="Kalm can connect to your private image registy and help you automatically synchronize image pull secrets to various applications. Kalm provides webhooks so whatever CI you are using, you can trigger deployment updates easily."
          title="Integrate with CI/CD"
          image="img/node_scheduling2.png"
        />
      </div>
    </Layout>
  );
}

export default Home;
