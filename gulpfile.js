const { src, dest, parallel, watch } = require('gulp')
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const iife = require("gulp-iife")
const insert = require("gulp-insert")
const rename = require("gulp-rename")
const sass = require("gulp-sass")
const uglify = require("gulp-uglify")

sass.compiler = require('node-sass')
const sassOpts = {
    outputStyle: 'compressed'
}

function adminJS () {
    return src('admin-js/*.js')
        .pipe(concat('IntranetUserJS.js'))
        .pipe(iife())
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(uglify())
        .pipe(insert.prepend(`// minified ${Date()} - see https://github.com/cca/koha_snippets\n`))
        .pipe(dest('dist'))
}

function catalogJS () {
    return src('catalog-js/*.js')
        .pipe(concat('OPACUserJS.js'))
        .pipe(iife())
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(uglify())
        .pipe(insert.prepend(`// minified ${Date()} - see https://github.com/cca/koha_snippets\n`))
        .pipe(dest('dist'))
}

function adminCSS() {
    return src('admin-scss/index.scss')
        .pipe(sass.sync(sassOpts).on('error', sass.logError))
        .pipe(rename('IntranetUserCSS.css'))
        .pipe(insert.prepend(`/* minified ${Date()} - see https://github.com/cca/koha_snippets */`))
        .pipe(dest('dist'))
}

function catalogCSS() {
    return src('catalog-scss/index.scss')
        .pipe(sass.sync(sassOpts).on('error', sass.logError))
        .pipe(rename('OPACUserCSS.css'))
        .pipe(insert.prepend(`/* minified ${Date()} - see https://github.com/cca/koha_snippets */`))
        .pipe(dest('dist'))
}

module.exports = {
    'admin-js': adminJS,
    'catalog-js': catalogJS,
    'admin-css': adminCSS,
    'catalog-css': catalogCSS,
    js: parallel(adminJS, catalogJS),
    css: parallel(catalogCSS, adminCSS),
    default: parallel(adminJS, catalogJS, adminCSS, catalogCSS)
}
