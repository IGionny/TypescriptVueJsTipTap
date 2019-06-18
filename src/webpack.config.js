let path = require('path');
let webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
  VueLoaderPlugin
} = require('vue-loader');

module.exports = {
  entry: {
    TestTipTap: './Typescript/VueUI/TestTipTap.ts'

  },
  output: {
    path: path.resolve(__dirname, './wwwroot/VueUI'),
    publicPath: 'wwwroot/VueUI/',
    filename: '[name].js'
  },
  
  mode: process.env.NODE_ENV,
  externals: {
    "vue": 'Vue'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      //$ -> Exact match
      "vue$": "vue/dist/vue.esm.js",
      "tiptap$" : path.resolve(__dirname, "node_modules", "tiptap/dist/tiptap.esm.js"),
      "tiptap-commands$" : path.resolve(__dirname, "node_modules", "tiptap-commands/dist/commands.esm.js"),
      "tiptap-extensions$" : path.resolve(__dirname, "node_modules", "tiptap-extensions/dist/extensions.esm.js"),
      "tiptap-utils$" : path.resolve(__dirname, "node_modules", "tiptap-utils/dist/utils.esm.js"),

    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        include: path.resolve(__dirname, 'Typescript', "VueUI"),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
         // "cache-loader",
          "vue-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          //"cache-loader",
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
        //        loader: 'ts-loader',
        include: path.resolve(__dirname, 'Typescript', "VueUI"),
        exclude: path.resolve(__dirname, 'node_modules'),

      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'Typescript', "VueUI"),
        exclude: path.resolve(__dirname, 'node_modules'),
        oneOf: [
          // this applies to <style module>
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:8]'
                }
              }
            ]
          },
          // this applies to <style> or <style scoped>
          {
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
      }
      /*,{
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
              name: '[name].[ext]?[hash]'
          }
      }*/
      /*{
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/
     },*/
    ]
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port: 3000
  },
  devtool: "#eval-source-map",
  context: path.resolve(__dirname, './'),
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  module.exports.optimization = {
    //!debug && uglify

    namedModules: true,
    splitChunks: {
      name: 'vendor',
      minChunks: 2,
    },
    noEmitOnErrors: true,
    minimize: true,
    usedExports: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        extractComments: false,
        uglifyOptions: {
          ie8: false,
          mangle: {
            reserved: [],
          },
          compress: {
            if_return: true,
            unused: true,
            booleans: true,
            properties: true,
            dead_code: true,
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            drop_console: true,
            passes: 2
          },
          output: {
            comments: false,
            beautify: false
          },
          minimize: true
        }
      }),
    ]
  };
}
