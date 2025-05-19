/**
 * This file helps Vercel understand how to handle this project.
 * When used with NPM packages like https://www.npmjs.com/package/@vercel/static-build,
 * it tells Vercel how to build and serve the project.
 */

// Export configuration - this is just informational, Vercel primarily uses vercel.json
module.exports = {
  version: 2,
  routes: [
    // Handle API requests
    { src: "/api/(.*)", dest: "/api/$1" },

    // For everything else, serve the index.html, which will handle client-side routing
    { src: "/(.*)", dest: "/index.html" },
  ],
};
