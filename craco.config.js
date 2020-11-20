const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0652DD',
              '@layout-body-background': '#ffffff',
              '@link-color': '#1890ff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};