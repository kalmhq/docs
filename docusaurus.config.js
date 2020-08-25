/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: "Kalm", // Title for your website.
  url: "https://kalm.dev", // Your website URL
  baseUrl: "/", // Base URL for your project */
  // Used for publishing and more
  projectName: "kalm",
  organizationName: "kalmhq",

  /* path to images for header/footer */
  favicon: "img/kalm-logo-blue.svg",

  themeConfig: {
    // algolia: {
    //   apiKey: '47ecd3b21be71c5822571b9f59e52544',
    //   indexName: 'docusaurus-2',
    //   algoliaOptions: {
    //      //...
    //   },
    // },

    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: "Kalm",
      hideOnScroll: true,
      logo: {
        alt: "Kalm Logo",
        src: "img/kalm-logo-blue.svg",
      },
      items: [
        { to: "/docs", label: "Docs" },
        { href: "https://github.com/kalmhq/kalm", label: "Github" },
      ],
    },

    footer: {
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Install Kalm",
              to: "docs/install",
            },
            {
              label: "Basic Tutorial",
              to: "docs/tut-hello",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Twitter",
              to: "https://twitter.com/Kalm_HQ",
            },
            {
              label: "Docker Hub",
              to: "https://hub.docker.com/u/kalmhq",
            },
          ],
        },
        {
          title: "Source Code",
          items: [
            {
              label: "Github",
              to: "https://github.com/kalmhq/kalm",
            },
          ],
        },
      ],
      logo: {
        alt: "Facebook Open Source Logo",
        src: "img/kalm-logo-blue.svg",
        href: "https://kalm.dev/",
      },
      copyright: `Copyright © ${new Date().getFullYear()} Random Block Labs, Inc.`,
    },
    image: "img/undraw_online.svg",
    sidebarCollapsible: false,
    twitterImage: "img/undraw_tweetstorm.svg",
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          homePageId: "intro",
          sidebarPath: require.resolve("./sidebars.json"),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
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
