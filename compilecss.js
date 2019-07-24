const purify = require("purify-css");


var content = ['static/js/*.js', 'static/js/quill/*.js', 'index.html'];

var css = ['static/css/bulma/bulmaswatch.min.css',
  "static/js/quill/quill.snow.css",
  "static/js/quill/quill.core.css",
  "static/orbitron/*.css",
  "static/css/main.css"
];

var options = {
  // Will write purified CSS to this file.
  output: 'doc/static/all.min.css',
  minify: true,
};

purify(content, css, options);