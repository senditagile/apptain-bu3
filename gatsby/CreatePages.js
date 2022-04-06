const path = require('path');
const createPaginatedPages = require('gatsby-paginate');
const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
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
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { edges = [] } = result.data.allMarkdownRemark;

    const tagSet = new Set();

    createPaginatedPages({
      edges,
      createPage,
      pageTemplate: 'src/templates/index.js',
      context: {
        totalCount: edges.length,
      },
      pathPrefix: 'pages',
      buildPath: (index, pathPrefix) => {
        if (index > 1) {
          return `${pathPrefix}/${index}`;
        }
        return '/';
      },
    });
    
    
    edges.filter(({ node }) => IS_DEV || node.frontmatter.published)
    .forEach(({ node }, index) => {
      const { id, frontmatter, fields } = node;
      const { slug, tags, template } = frontmatter;

      // 讀取標籤
      if (tags) {
        tags.forEach(item => tagSet.add(item));
      }

      // 允许自定义地址
      let $path = fields.slug;
      if (slug) {
        $path = slug;
      }

      const component = template || 'blog-post';

      createPage({
        path: $path,
        tags,
        component: path.resolve(`src/templates/${String(component)}.js`),
        // additional data can be passed via context
        context: {
          id,
          index,
        },
      });
    });

    // 創建標籤頁面
    return tagSet.forEach((tag) => {
      createPage({
        path: `/tag/${tag}`,
        component: path.resolve('src/templates/tag.js'),
        context: {
          tag,
        },
      });
    });
  });
};
