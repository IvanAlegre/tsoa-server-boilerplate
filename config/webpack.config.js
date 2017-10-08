const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {
  'swagger.json': 'commonjs /code/build/swagger.json'
};

fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    if (/^@/.test(mod)) {
      fs.readdirSync(path.resolve('node_modules', mod))
        .forEach((smod) => {
          const m = `${mod}/${smod}`;
          nodeModules[m] = `commonjs ${m}`;
        });
    } else {
      nodeModules[mod] = `commonjs ${mod}`;
    }
  });

const tsRegex = /\.tsx?$/;
const entryPoints = {};
try {
  fs.readdirSync('bin')
    .filter(a => tsRegex.test(a))
    .forEach(a => {
      entryPoints[a.replace(tsRegex, '')] = `./bin/${a}`;
    });
} catch (e) {} // eslint-disable-line

let config = {
  entry: Object.assign({
    build: './src/index.ts',
  }, entryPoints),
  target: 'node',
  output: {
    path: path.join(process.cwd(), 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: nodeModules,
  plugins: [
    // Needed for mapping sourcemap stackagents
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  devtool: 'inline-sourcemap'
};

// Allow extension of webpack config
try {
  const configFn = require(path.join(process.cwd(), 'webpack.config.js')); // eslint-disable-line
  config = configFn(config);
} catch(e) {} // eslint-disable-line

module.exports = config;
