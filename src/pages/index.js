import React from 'react';
import { graphql } from 'gatsby';

import Link from 'gatsby-link';
import Card from '../components/Card';
import Sidebar from '../components/Sidebar';
import ShareBox from '../components/ShareBox';

import '../templates/index.scss';

// import Logo from '@/icons/Logo';

const IS_DEV = process.env.NODE_ENV === 'development';

const NavLinkText = ({ color, text }) => (
  <div
    className="navlink"
    style={{
      color,
    }}
  >
    {text}
  </div>
);

const NavLink = ({ test, url, text }) => {
  if (!test) {
    return <NavLinkText color="#7d7d7d" text={text} />;
  }

  return (
    <Link to={`${url}`}>
      <NavLinkText color="#66ccff" text={text} />
    </Link>
  );
};


const HomePageTemplate = ({ data }) => {
  // const { edges: group } = data.allMarkdownRemark
  return (
    <>
      <div
        className="row homepage"
        style={{
          marginTop: 20,
        }}
      >
        <Sidebar />
        <div className="col-xl-6 col-lg-7 col-md-12 col-xs-12 order-2">
        {data.filter(({ node }) => IS_DEV || node.frontmatter.published).map(({ node }) => (
            <Card {...node.frontmatter} url={data.slug ? data.slug : node.fields.slug} key={node.fields.slug} />
          ))}

          <div
            className="row"
            style={{
              justifyContent: 'space-around',
              marginBottom: '20px',
            }}
          >
            {/* <div className="previousLink">
              <NavLink test={!first} url={previousUrl} text="Previous" />
            </div>
            <div className="nextLink">
              <NavLink test={!last} url={nextUrl} text="Next" />
            </div> */}
          </div>
        </div>
        <div className="col-xl-2 col-lg-1 order-3" />
      </div>
      {/* <ShareBox url={location.href} hasCommentBox={false} /> */}
    </>
  );
};

const HomePage = ({ data }) => {

  const { edges: frontmatter } = data.allMarkdownRemark;

  return (
    <>
      <HomePageTemplate data={frontmatter} />
    </>
  );
};

export const pageQuery = graphql`
  query HomePageTemplate  {
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
            published
          }
        }
      }
    }
  }
`;

export default HomePage;
