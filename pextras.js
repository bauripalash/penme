const purify = require("purify-css");


var content = ['js/*.js', 'js/**/*.js' , 'index.html'];
var css = ['css/bulma/bulmaswatch.min.css' , "css/main.css" , "js/quill/quill.snow.css"];

var options = {
  // Will write purified CSS to this file.
  output: 'purified.css',
  minify: true,
};

purify(content, css, options);
