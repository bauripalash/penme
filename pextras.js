const purify = require("purify-css");


var content = ['static/js/*.js', 'static/js/quill/*.js', 'index.html'];

var css = ['static/css/bulma/bulmaswatch.min.css',
  "static/css/main.css",
  "static/js/quill/quill.snow.css",
  "static/js/quill/quill.core.css",
  "static/orbitron/*.css"
];

var options = {
  // Will write purified CSS to this file.
  output: './static/all.min.css',
  minify: true,
};

purify(content, css, options);
