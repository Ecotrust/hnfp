var path = require('path');

module.exports = {
  context: __dirname,
  entry: "./static/js/app.js",
  output: {
    path: path.resolve(__dirname, "static/js"),
    filename: 'app.min.js'
  },
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  }
};
