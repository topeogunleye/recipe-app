const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  mode: 'development',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#F5F5F5',
        description: {
          name: 'description',
          content:
            'Find your favourite recipes including instructions and ingredients used to make them, bookmark recipes and also add your own recipes.',
        },
        keyword: { name: 'keywords', content: 'yummy, recipe, app' },
        'og:title': { property: 'og:title', content: 'Yummy | Recipe Finder' },
        'og:description': {
          property: 'og:description',
          content:
            'Find your favourite recipes including instructions and ingredients used to make them, bookmark recipes and also add your own recipes.',
        },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': {
          property: 'og:url',
          content: 'https://recipeappmicroverse.netlify.app/',
        },
        'og:image': { property: 'og:image', content: '/og.png' },
        'twitter:card': {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        'twitter:creator': {
          name: 'twitter:creator',
          content: '@topeogunleye21',
        },
        'twitter:title': {
          name: 'twitter:title',
          content: 'Yummy | Recipe Finder',
        },
        'twitter:description': {
          name: 'twitter:description',
          content:
            'Find your favourite recipes including instructions and ingredients used to make them, bookmark recipes and also add your own recipes.',
        },
        'twitter:image': { name: 'twitter:image', content: '/og.png' },
      },
    }),
    new FaviconsWebpackPlugin({
      logo: './src/icons/favicon-180.png', // svg works too!
      mode: 'webapp', // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
      devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
      favicons: {
        appName: 'Yummy',
        appDescription:
          'Find your favourite recipes including instructions and ingredients used to make them, bookmark recipes and also add your own recipes.',
        developerName: 'Tope Leye',
        developerURL: 'https://recipeappmicroverse.netlify.app/', // prevent retrieving from the nearest package.json
        background: '#ddd',
        theme_color: '#333',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
