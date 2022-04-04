# Henlo (v0.6.0)

[![Netlify Status](https://api.netlify.com/api/v1/badges/43532afb-3488-432b-8185-a745645a90d8/deploy-status)](https://app.netlify.com/sites/apptain/deploys)

[Official Website / Demo](https://apptain.netlify.app/)

**Note:** This starter uses [Gatsby v4](https://www.gatsbyjs.com/blog/gatsby-v4/) with updated `gatsby-plugin-image`.

This repo contains an example business website that is built with [Gatsby](https://www.gatsbyjs.com/docs/), and [Netlify CMS](https://www.netlifycms.org).

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## Features

- Battle-tested starting point for small & large web projects
- Starter for pages and collections CMS configuration with Netlify CMS
- Easy Netlify CMS configuration using [Manual Initialization](https://www.netlifycms.org/docs/beta-features/#manual-initialization)
- Built in Tailwind with SCSS and `purge-css-plugin`
- Built in sitemaps
- Blazing fast loading times thanks to pre-rendered HTML and automatic chunk loading of JS files
- Uses `gatsby-plugin-image`
- Netlify deploy configuration
- Netlify function support, see `lambda` folder
- Support for async Netlify forms
- Complete SEO configuration with graphql fragment and reusable components
- Perfect score on Lighthouse for SEO, Accessibility and Performance (wip:PWA)
- Readme template for custom projects
- ..and more

## Prerequisites

- Node 16.13
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)
- [Netlify CLI](https://github.com/netlify/cli)

## Getting Started (Recommended)

Netlify CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. The example here is the Kaldi coffee company template (adapted from [Gatsby Starter Netlify CMS](https://github.com/netlify-templates/gatsby-starter-netlify-cms)). Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/clean-commit/gatsby-starter-apptain"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

## Getting Started (Without Netlify)

```
$ gatsby new [SITE_DIRECTORY_NAME] https://github.com/clean-commit/gatsby-starter-apptain
$ cd [SITE_DIRECTORY_NAME]
$ yarn start
```

### Access Locally

Pulldown a local copy of the Github repository Netlify created for you, with the name you specified in the previous step

```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ netlify dev
```

This uses the new [Netlify Dev](https://www.netlify.com/products/dev/?utm_source=blog&utm_medium=netlifycms&utm_campaign=devex) CLI feature to serve any functions you have in the `lambda` folder.

To test the CMS locally, you'll need run a production build of the site:

```
$ yarn build
$ netlify dev # or ntl dev
```

### Deployment

We've added additional commands for quick deployments with Netlify CLI. To deploy the website to netlify cms simply run.

```
$ yarn deploy:prod
```

The website will build locally and then deploy to production.

### Setting up the CMS

Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

Henlo uses Manual Initialization to take advantage of componetized approach to managing configuration for Netlify CMS. Thanks to that you don't have to control the CMS from centralized YAML file.

```javascript
import CMS from 'netlify-cms-app';
import pages from '@/cms/pages';
import posts from '@/cms/collections/posts';

window.CMS_MANUAL_INIT = true;

CMS.init({
  config: {
    load_config_file: false,
    backend: {
      name: 'git-gateway',
      branch: 'master',
    },
    media_folder: '/static/img',
    public_folder: '/img',
    collections: [pages, posts],
  },
});
```

#### Example configuration for Home Page

```javascript
import seo from '@/cms/partials/seo';

const page = {
  file: 'content/pages/home.md',
  label: 'Home',
  name: 'Home',
  fields: [
    {
      label: 'Layout',
      name: 'layout',
      widget: 'hidden',
      default: 'index',
    },
    {
      label: 'Type',
      name: 'type',
      widget: 'hidden',
      default: 'page',
    },
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
      default: '',
      required: false,
    },
    {
      label: 'Links',
      name: 'links',
      widget: 'list',
      fields: [
        {
          label: 'Link',
          name: 'link',
          widget: 'object',
          fields: [
            {
              label: 'Content',
              name: 'content',
              widget: 'string',
              required: false,
            },
            {
              label: 'URL',
              name: 'url',
              widget: 'string',
              required: false,
            },
          ],
        },
      ],
    },
    seo,
  ],
};

export default page;
```

### Adding Favicons

Favicons can be generated using this [Favicon Generator](https://www.favicon-generator.org/) After generating the icons, drop the contents of downloaded file into `static/img/favicons` directory

### Preloading fonts

Since 0.4.0 Henlo supports [`gatsby-plugin-preload-fonts`](https://www.gatsbyjs.com/plugins/gatsby-plugin-preload-fonts/) plugin out of the box. To create the preload cache you need to start development server and then run `preload-fonts` command. This will generate the `font-preload-cache.json` file in the root of your project. When your projects builds fonts will be added automatically to head of the document.

```
yarn start
yarn preload-fonts
```

## Browser support

Gatsby tends to add a lot of polyfills to support older browser versions. In package.json file you can adjust which sites your project should support. As default Henlo will use `defaults` setting. If you want to learn more about the browser support visit official [Gatsby How-To Guide on this subject](https://www.gatsbyjs.com/docs/how-to/custom-configuration/browser-support/)

## Debugging

Windows users might encounter `node-gyp` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.

```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')

MacOS users might also encounter some errors, for more info check [node-gyp](https://github.com/nodejs/node-gyp). We recommend using the latest stable node version.

## PurgeCSS

This plugin uses [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/) and [Tailwind](https://tailwindcss.com/). The builds are usually ~780K but reduced 98% by purgecss. Normally our websites won't cross 30Kb of CSS.

Since Henlo v0.5.0 we use PurgeCSS v4, the default configuration is already included, to learn more [check purgecss docs](https://purgecss.com/configuration.html) or [check gatsby-plugin-purgecss documentation](https://www.gatsbyjs.com/plugins/gatsby-plugin-purgecss/)

```javascript
{
  resolve: `gatsby-plugin-purgecss`,
  options: {
    printRejected: true,
    develop: false,
    tailwind: true,
    purgeCSSOptions: {
      safelist: {
        standard: [],
        deep: [],
      },
    },
  },
},
```

# CONTRIBUTING

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct](CODE_OF_CONDUCT.md).

# Additional guides

Here's a list of helpful articles that will help you with your first steps using Henlo!

- [Efficient Netlify CMS config with Manual Initialization](https://mrkaluzny.com/blog/dry-netlify-cms-config-with-manual-initialization?utm_source=GitHub&utm_medium=apptain-gatsby)
- [How to optimize SEO with Gatsby & Netlify](https://mrkaluzny.com/blog/how-to-optimize-seo-with-gatsby-netlify?utm_source=GitHub&utm_medium=apptain-gatsby)
- [https://mrkaluzny.com/blog/full-text-search-with-gatsby-and-netlify-cms/](https://mrkaluzny.com/blog/full-text-search-with-gatsby-and-netlify-cms?utm_source=GitHub&utm_medium=apptain-gatsby)
