const {
    src,
    dest,
    series
} = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
// const gulpCopy = require('gulp-copy');

const destination = "./docs/";

function js() {
    return src(['src/static/js/modal-fx.min.js',
            'src/static/js/quill/quill.min.js',
            // 'src/static/js/jspdf.min.js',
            'src/static/js/lz-string.js',
            'src/static/js/main.js'
        ])
        .pipe(concat('all.min.js'))
        .pipe(dest(destination + "/static/"));
}

function html() {
    return src("src/index.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest(destination));

}

function CopyFavicons() {
    return src("src/static/favicons/**")
        .pipe(dest("docs/static/favicons"));
}

function CopyIcons() {
    return src("src/static/icons/**")
        .pipe(dest("docs/static/icons"));
}

function CopyFonts() {
    return src("src/static/orbitron/*.woff2")
        .pipe(dest("docs/static/orbitron"));
}

function CopyImages() {
    return src(["src/static/imgs/pattern-min.png", "src/static/imgs/scover.png"])
        .pipe(dest("docs/static/imgs"));
}

function CopyExtras() {
    return src(["src/sw.js", "src/manifest.json", "src/CNAME", "src/.nojekyll"])
        .pipe(dest("docs/"));
}

function CopyQuillMap() {
    return src("src/static/quill.min.js.map")
        .pipe(dest("docs/static"));
}

exports.js = js;
exports.html = html;
exports.CopyExtras = CopyExtras;
exports.CopyFavicons = CopyFavicons;
exports.CopyFonts = CopyFonts;
exports.CopyIcons = CopyIcons;
exports.CopyImages = CopyImages;
exports.CopyQuillMap = CopyQuillMap;

copytasks = series(CopyExtras, CopyFavicons, CopyFonts, CopyIcons, CopyImages, CopyQuillMap);
exports.runall = series(html, js, copytasks);
exports.default = series(html, js, copytasks);