const purify = require("purify-css");

function compilecss() {
  let content = ['src/static/js/*.js', 'src/static/js/quill/*.js', 'src/index.html'];

  let css = ['src/static/css/bulma/bulmaswatch.min.css',
    "src/static/js/quill/quill.snow.css",
    "src/static/js/quill/quill.core.css",
    "src/static/orbitron/*.css",
    "src/static/css/main.css"
  ];

  let options = {
    output: 'docs/static/all.min.css',
    minify: true,
  };

  purify(content, css, options);
  console.log("[+] CSS Compilation Complete!");
}

compilecss();
module.exports.compilecss = compilecss;