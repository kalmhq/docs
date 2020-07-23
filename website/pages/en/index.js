/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig } = this.props;

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = (props) => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <div>
        <h2 className="projectTitle">{siteConfig.headline}</h2>
        <div className="subtitle">{siteConfig.subtitle}</div>
      </div>
    );

    const PromoSection = (props) => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    return (
      <Container background="light">
        <SplashContainer>
          <div className="inner">
            {/* <img src={siteConfig.baseUrl + 'img/Kubernetes_logo_without_workmark.svg'} alt="Logo" width="150" height="140" /> */}
            <ProjectTitle />
            <PromoSection>
              <a href="/docs/intro" className="btn-primary">
                Get Started
              </a>
            </PromoSection>
          </div>
        </SplashContainer>
      </Container>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Block = (props) => (
      <Container
        padding={["bottom", "top"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align="left"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <Container>
        <GridBlock
          align="center"
          layout="threeColumn"
          className="feature"
          contents={[
            {
              title: "Open Source",
              content:
                "Kalm is free and open source. Deploy on your cluster trustlessly. Modifiable to fit your requirements.",
            },
            {
              title: "Works with any Kubernetes cluster",
              content:
                "Works with Minikube, GKE, AKE, MKE, Digital Ocean, Aliyun and more",
            },
            {
              title: "For Developers",
              content:
                "Built for developers, by developers. Full time DevOps not required.",
            },
          ]}
        />
      </Container>
    );

    const WebFeature = () => (
      <Block background="light">
        {[
          {
            title: "Easily Create and Update Applications",
            content:
              "Kalm provides an intuitive web interface for performing common tasks including App configuration, scaling, routing, auto-healing, and job scheduling",
            image: `img/Configs3.svg`,
            imageAlign: "right",
          },
        ]}
      </Block>
    );

    const RoutesFeature = () => (
      <Block background="dark">
        {[
          {
            title: "Add Routes",
            content:
              "Kalm makes it easy to configure external access - hook up hosts and paths to services, specify routing rules, and setup HTTPS",
            image: `${baseUrl}img/Configs3.svg`,
            imageAlign: "right",
          },
        ]}
      </Block>
    );

    const AppCrdFeature = () => (
      <Block background="light">
        {[
          {
            title: "Organize your cluster into Apps",
            content:
              "Kalm defines a high-level CRD called Application - which helps cut down the amount of boilerplate and copy pasting in the underlying config files",
            image: `${baseUrl}img/Configs3.svg`,
            imageAlign: "right",
          },
        ]}
      </Block>
    );

    const OutOfTheBoxFeature = () => (
      <Block background="dark">
        {[
          {
            title: "Works Out of the Box",
            content:
              "First time K8s setup can be daunting. Kalm installs all the necessary dependencies for common usecases and works out of the box. ",
            image: `${baseUrl}img/Configs3.svg`,
            imageAlign: "right",
          },
        ]}
      </Block>
    );

    const OperatorFeature = () => (
      <Block background="light">
        {[
          {
            title: "Kalm is a Kubernetes Operator",
            content:
              " Kalm uses the Kubernetes Operator pattern and CRD(Custom Resource Definitions), which means its easy to install and complements existing tools. Drop into kubectl anytime if the web UI does not cover a corner case.",
            image: `${baseUrl}img/Configs3.svg`,
            imageAlign: "right",
          },
        ]}
      </Block>
    );

    const AnyClusterFeature = () => (
      <Block background="dark">
        {[
          {
            title: "Work with all clusters",
            content:
              "Kalm doesn't explicity depend on platform specific features. You can use Kalm on any kubernetes cluster, including Amazon EKS, Google Kubernetes Engine, Digital Ocean Kubernetes Cluster, and minikube. Take Kalm with you if you need to migrate from one platform to another.",
            image: `${baseUrl}img/Configs3.svg`,
            imageAlign: "right",
          },
        ]}
      </Block>
    );

    const CDFeature = () => (
      <Block background="light" id="try">
        {[
          {
            title: "Integrate with CI/CD",
            content:
              "Kalm provides a webhook so whatever CI you are using, you can trigger deployment updates easily",
            image: `${baseUrl}img/node_scheduling2.png`,
            imageAlign: "right",
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter((user) => user.pinned)
        .map((user) => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = (page) =>
        baseUrl + (language ? `${language}/` : "") + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl("users.html")}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          {/* <Features />
            commenting this part out for now*/}
          <FeatureCallout />
          <WebFeature />
          <RoutesFeature />
          <AppCrdFeature />
          <OutOfTheBoxFeature />
          <OperatorFeature />
          <AnyClusterFeature />
          <CDFeature />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
