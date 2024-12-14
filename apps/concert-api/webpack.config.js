const { composePlugins, withNx } = require('@nrwl/webpack');
const Dotenv = require('dotenv-webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  
  // Update the webpack config as needed here.
  const dotenv = new Dotenv();
  config.plugins.push(dotenv);
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});
