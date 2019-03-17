/* config-overrides.js */

const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const rewireEslint = require('react-app-rewire-eslint');
 
module.exports = function override(config, env) {
  config.plugins = config.plugins.map(plugin => {
    if(plugin.constructor.name === 'GenerateSW') {
      return new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js'
      })
    }

    return plugin
  })

  config = rewireEslint(config, env);

  return config
}
