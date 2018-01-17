const path = require('path');
var prod = process.env.NODE_ENV === 'production'

var plugins = {
  'autoprefixer': {
    filter: /\.(wxss|css)$/,
    config: {
      browsers: ['last 11 iOS versions']
    }
  },
};
module.exports = {
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    modules: ['node_modules']
  },
  eslint: false,
  compilers: {
    less: {
      compress: true
    },
    /*sass: {
     outputStyle: 'compressed'
     },*/
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'babel-polyfill',
        'babel-plugin-transform-class-properties',
        'transform-decorators-legacy',
        'transform-export-extensions',
        'syntax-export-extensions',
        'transform-object-rest-spread'
      ]
    }
  },
  plugins: plugins,
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {compress: true}

  // 压缩jsn
  plugins.uglifyjs = {
    filter: /\.js$/,
    config: {}
  };
}
module.exports.plugins = plugins;
