const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));

// Плагіни
const fileinclude = require("gulp-file-include");
const del = require("del");

// Задачі
const html = () => {
    return src("./src/html/*.html")
        .pipe(fileinclude())
        .pipe(dest("./public"))
        .pipe(browserSync.stream());
}

const scss = () => {
    return src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(dest("./public/css"))
        .pipe(browserSync.stream());
}

const server = () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    }); 
}

const clear = () => {
    return del("./public");
}

// Відслідковування
const watcher = () => {
    watch("./src/html/**/*.html", html);
    watch("./src/scss/**/*.scss", scss);
} 

exports.html = html;
exports.scss = scss;
exports.watch = watcher;
exports.clear = clear;

exports.dev = series(
    clear,
    parallel(html, scss),
    parallel(watcher, server)
)