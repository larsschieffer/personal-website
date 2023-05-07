/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  ignoredRouteFiles: ["**/.*"],
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  future: {
    v2_errorBoundary: true,
    v2_routeConvention: true,
    v2_normalizeFormMethod: true,
    v2_meta: true,
  },
  serverModuleFormat: "cjs",
  tailwind: true,
};
