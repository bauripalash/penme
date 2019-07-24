const {
    src,
    dest,
    series
} = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const gulpCopy = require('gulp-copy');

const destination = "./doc/";

function js() {
    return src(['static/js/modal-fx.min.js',
            'static/js/quill/quill.min.js',
            'static/js/jspdf.min.js',
            'static/js/lz-string.js',
            'static/js/main.js'
        ])
        .pipe(concat('all.min.js'))
        .pipe(dest(destination + "/static/"));
}

function html() {
    return src("./index.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest(destination));

}

function copy_imgs() {
    return src(["static/imgs/pattern-min.png",
            "static/imgs/scover.png",
            "static/favicons/**",
            "static/icons/**",
            "static/orbitron/*.woff2",
            "./sw.js",
            "./manifest.json",
            "static/quill.min.js.map"
        ])
        .pipe(gulpCopy("doc/"));
}

exports.js = js;
// exports.css = css;
exports.html = html;
// exports.post_css = post_css;
exports.copy_imgs = copy_imgs;
exports.default = series(html, js, copy_imgs);