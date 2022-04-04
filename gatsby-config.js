const path = require('path');
const tailwind = require('tailwindcss');

const settings = require("./data/template/config.json");

const netlifyCmsPaths = {
  resolve: `gatsby-plugin-netlify-cms-paths`,
  options: {
    cmsConfig: `/static/admin/config.yml`,
  },
}

module.exports = {
  siteMetadata: {
    title: 'Gatsby Starter',
    separator: '|',
    baseTitle: 'Henlo.',
    lang: 'en',
    twitterHandle: '@cleancommit',
    siteUrl: `localhost:8000`,
    image: '',
    themeColor: '#fff',
    keyword: 'gatsby-starter, blazing fast static site',
    description: 'Blazing fast static site with Henlo',
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-preload-fonts',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-brotli',
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
              quality: 72,
              withWebp: true,
              withAvif: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'pages',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [tailwind, require('./tailwind.config.js')],
      },
    },
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
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '@': path.join(__dirname, 'src'),
        '~': path.join(__dirname, ''),
        styles: path.join(__dirname, 'src/styles'),
        img: path.join(__dirname, 'static/img'),
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        manualInit: true,
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout/layout.js'),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "apptain",
        short_name: 'apptain',
        start_url: '/',
        background_color: '#ededed',
        theme_color: '#384f7c',
        display: 'standalone',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    {      
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          netlifyCmsPaths,
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
          },
        ],
      },
    },
    {
			resolve: `gatsby-plugin-feed`,
			options: {
				feeds: [
					{
						output: '/rss.xml',
						title: settings.meta.title,
						site_url: settings.url,
						feed_url: `${settings.url}/rss.xml`,
						language: 'en',
						ttl: 10080,
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.edges.map(edge => {
								return Object.assign({}, edge.node.frontmatter, {
									description: edge.node.frontmatter.description || edge.node.excerpt,
									date: edge.node.frontmatter.date,
									author: settings.meta.author,
									title: edge.node.frontmatter.title,
									// categories: [edge.node.frontmatter.category],
									url: settings.meta.siteUrl + '/' + edge.node.frontmatter.slug,
									guid: settings.meta.siteUrl + '/' + edge.node.frontmatter.slug,
									custom_elements: [
										{ 'content:encoded': edge.node.html },
										//{ reading_time: edge.node.fields.readingTime.text },
									],
								});
							});
						},
            query: `
            {
              allMarkdownRemark(
                limit: 1000
                sort: { order: DESC, fields: frontmatter___date }
              ) {
                edges {
                  node {
                    id
                    html
                    frontmatter {
                      template
                      slug
                      id
                      title
                      url: slug
                      date
                      tags
                      description
                      headerImage
                    }
                  }
                }
              }
            }
						`,
					},
				],
			},
		},
    // 'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};
