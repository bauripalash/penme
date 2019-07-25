const chokidar = require('chokidar');
const gulp = require("gulp");
const liveServer = require("live-server");
const {compilecss} = require("./compilecss");
const {
    js,
    html,
    runall,
    CopyExtras
} = require("./gulpfile");

const params = {
    port: 8800, // Set the server port. Defaults to 8080.
    root: "docs", // Set root directory that's being served. Defaults to cwd.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
};
liveServer.start(params);

const watcher = chokidar.watch('src/', {
    persistent: true
});

const log = console.log.bind(console);

watcher.on('ready', () => log('[+] Initial scan complete. Ready for changes'));

watcher.on('change', (path, stats) => {
    if (stats) {
        if (path.endsWith(".js")) {
            gulp.series([js, CopyExtras])(function (err) {
                if (err) {
                    log(`[Error] JS Compiled : ${path} : ${err}`);
                } else {
                    log(`[+] JS Compiled : ${path}`);
                }
            });
        } else if (path.endsWith(".html")) {
            gulp.series(html)(function (err) {
                if (err) {
                    log(`[Error] HTML Compiled : ${path} : ${err}`);
                } else {
                    log(`[+] HTML Compiled : ${path}`);
                }
            });
        }else if (path.endsWith(".css")) {
            try {
                compilecss();
                log(`[+] CSS Compiled : ${path}`);
            } catch (error) {
                log(`[Error] CSS Compiled : ${path} : ${error}`);
            }
            
        } else {
            gulp.series(runall)(function (err) {
                if (err) {
                    log(`[Error] Compiling All : ${path} : ${err}`);
                } else {
                    log(`[+] Compiling All : ${path}`);
                }
            });
        }
    }
});