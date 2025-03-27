// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

// const path = require('path');
// const _ = require('lodash');

// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions;
//   const postTemplate = path.resolve(`src/templates/post.js`);
//   const tagTemplate = path.resolve('src/templates/tag.js');

//   const result = await graphql(`
//     {
//       postsRemark: allMarkdownRemark(
//         filter: { fileAbsolutePath: { regex: "/content/posts/" } }
//         sort: { order: DESC, fields: [frontmatter___date] }
//         limit: 1000
//       ) {
//         edges {
//           node {
//             frontmatter {
//               slug
//             }
//           }
//         }
//       }
//       tagsGroup: allMarkdownRemark(limit: 2000) {
//         group(field: frontmatter___tags) {
//           fieldValue
//         }
//       }
//     }
//   `);

//   // Handle errors
//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`);
//     return;
//   }

//   // Create post detail pages
//   const posts = result.data.postsRemark.edges;

//   posts.forEach(({ node }) => {
//     createPage({
//       path: node.frontmatter.slug,
//       component: postTemplate,
//       context: {},
//     });
//   });

//   // Extract tag data from query
//   // const tags = result.data.tagsGroup.group;
//   // // Make tag pages
//   // tags.forEach(tag => {
//   //   createPage({
//   //     path: `/pensieve/tags/${_.kebabCase(tag.fieldValue)}/`,
//   //     component: tagTemplate,
//   //     context: {
//   //       tag: tag.fieldValue,
//   //     },
//   //   });
//   // });

//   // Extract tag data from query
// const tags = result.data.tagsGroup.group;
// // Make tag pages
// tags.forEach(tag => {
//   const tagValue = tag.fieldValue;
//   const tagPath = `/pensieve/tags/${_.kebabCase(tagValue)}/`;
//   // Skip problematic tag
//   if (tagValue.toLowerCase() === "clickable-cards") {
//     console.log("Skipping tag:", tagValue);
//     return;
//   }
//   createPage({
//     path: tagPath,
//     component: tagTemplate,
//     context: {
//       tag: tagValue,
//     },
//   });
// });
// };

// const webpack = require('webpack');

// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     plugins: [
//       new webpack.IgnorePlugin({
//         resourceRegExp: /^\.\/locale$/,
//         contextRegExp: /moment$/,
//       }),
//     ],
//   });
// };

// // https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
//   if (stage === 'build-html' || stage === 'develop-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /scrollreveal/,
//             use: loaders.null(),
//           },
//           {
//             test: /animejs/,
//             use: loaders.null(),
//           },
//           {
//             test: /miniraf/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     });
//   }

//   actions.setWebpackConfig({
//     resolve: {
//       alias: {
//         '@components': path.resolve(__dirname, 'src/components'),
//         '@config': path.resolve(__dirname, 'src/config'),
//         '@fonts': path.resolve(__dirname, 'src/fonts'),
//         '@hooks': path.resolve(__dirname, 'src/hooks'),
//         '@images': path.resolve(__dirname, 'src/images'),
//         '@pages': path.resolve(__dirname, 'src/pages'),
//         '@styles': path.resolve(__dirname, 'src/styles'),
//         '@utils': path.resolve(__dirname, 'src/utils'),
//       },
//     },
//   });
// };

/**
 * Implement Gatsby's Node APIs in this file.
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve('src/templates/tag.js');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query: ${result.errors}`);
    return;
  }

  // Create post detail pages
  const posts = result.data?.postsRemark?.edges || [];
  if (!posts.length) {
    reporter.warn("No posts found in content/posts/");
  }

  posts.forEach(({ node }) => {
    const slug = node.frontmatter?.slug;
    if (!slug) {
      reporter.warn("Skipping post with no slug:", node);
      return;
    }
    console.log("Creating post page:", slug); // Debug log
    if (slug === "/pensieve/clickable-cards/") {
      console.log("Found /pensieve/clickable-cards/, investigating...");
    }
    createPage({
      path: slug,
      component: postTemplate,
      context: {
        slug, // Explicitly pass slug to query
      },
    });
  });

  // Extract tag data from query
  const tags = result.data?.tagsGroup?.group || [];
  if (!tags.length) {
    reporter.warn("No tags found in query result");
  }

  // Make tag pages
  tags.forEach(tag => {
    const tagValue = tag.fieldValue;
    if (!tagValue) {
      reporter.warn("Skipping tag with no fieldValue:", tag);
      return;
    }
    const tagPath = `/pensieve/tags/${_.kebabCase(tagValue)}/`;
    // Optional: Skip problematic tag (unrelated to this error, but kept for robustness)
    if (tagValue.toLowerCase() === "clickable-cards") {
      console.log("Skipping tag:", tagValue);
      return;
    }
    console.log("Creating tag page:", tagPath); // Debug log
    createPage({
      path: tagPath,
      component: tagTemplate,
      context: {
        tag: tagValue,
      },
    });
  });
};

const webpack = require('webpack');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};