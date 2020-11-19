const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#2962ef',
              '@layout-body-background': '#ffffff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};