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
              '@link-color': '#353b48'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};