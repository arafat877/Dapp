const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#3c40c6',
              '@layout-body-background': '#ffffff',
              '@link-color': '#0a3d62'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};