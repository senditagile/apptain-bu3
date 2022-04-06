import React from 'react';

import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import './index.scss';

const LatestPost = ({ posts }) => (
  <div className="latest-post">
    <p>Posts</p>
    {posts.map(({ node }) => (
      <Link
        to={'/' + node.frontmatter.url}
        key={node.frontmatter.url}
        href={'/' + node.frontmatter.url }
      >
        {node.frontmatter.title.substring(0, node.frontmatter.title.indexOf('-'))}
      </Link>
    ))}
  </div>
);

LatestPost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LatestPost;
