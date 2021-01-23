/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.
const path = require("path");

const siteConfig = {
  title: "Kalm", // Title for your website.
  url: "https://kalm.dev", // Your website URL
  baseUrl: "/", // Base URL for your project */
  // Used for publishing and more
  projectName: "kalm",
  organizationName: "kalmhq",
  /* path to images for header/footer */
  favicon: "img/kalm-logo-blue.svg",
  plugins: [path.resolve(__dirname, "heap-plugin")],
  themeConfig: {
    algolia: {
      apiKey: "d589acaac8cdb8ae96fca3f78c600ae4",
      indexName: "kalm",
      searchParameters: {}, // Optional (if provided by Algolia)
    },

    navbar: {
      title: "Kalm",
      hideOnScroll: true,
      logo: {
        alt: "Kalm Logo",
        src: "img/kalm-logo-blue.svg",
      },
      items: [
        // {
        //   type: "docsVersionDropdown",
        //   position: "left",
        //   // to: "/path // by default, link to active/latest version
        //   // label: "label" // by default, show active/latest version label
        // },
        { to: "/", label: "Docs" },
        // { href: "https://github.com/kalmhq/kalm", label: "Github" },
        // { to: "/versions", label: "All Versions", position: "right" },
      ],
    },

    footer: {
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "get-started",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Docker Hub",
              to: "https://hub.docker.com/u/kalmhq",
            },
            {
              label: "GitHub",
              to: "https://github.com/kalmhq/kalm",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Slack",
              to: "https://kubernetes.slack.com/archives/C01AC80DTFE",
            },
            {
              label: "Twitter",
              to: "https://twitter.com/Kalm_HQ",
            },
          ],
        },
      ],
      logo: {
        alt: "Facebook Open Source Logo",
        src: "img/kalm-logo-blue.svg",
        href: "https://kalm.dev/",
      },
      copyright: `Copyright © ${new Date().getFullYear()} Kalm Inc.`,
    },
    image: "img/undraw_online.svg",
    twitterImage: "img/undraw_tweetstorm.svg",
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.json"),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          routeBasePath: "/",
          // For no header links in the top nav bar -> headerLinks: [],
          editUrl: "https://github.com/kalmhq/docs/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};

module.exports = siteConfig;
