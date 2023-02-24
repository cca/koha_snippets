const { src, dest, parallel, watch } = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const eslint = require('gulp-eslint')
const iife = require('gulp-iife')
const insert = require('gulp-insert')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const sasslint = require('gulp-sass-lint');
const uglify = require('gulp-uglify')

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
        .pipe(sass(sassOpts).on('error', sass.logError))
        .pipe(rename('IntranetUserCSS.css'))
        .pipe(insert.prepend(`/* minified ${Date()} - see https://github.com/cca/koha_snippets */`))
        .pipe(dest('dist'))
}

function catalogCSS() {
    return src('catalog-scss/index.scss')
        .pipe(sass(sassOpts).on('error', sass.logError))
        .pipe(rename('OPACUserCSS.css'))
        .pipe(insert.prepend(`/* minified ${Date()} - see https://github.com/cca/koha_snippets */`))
        .pipe(dest('dist'))
}

function lint() {
    return src(['admin-js/*.js', 'catalog-js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
}

function stylelint() {
    return src(['admin-scss/*.scss', 'catalog-scss/*.scss'])
        .pipe(sasslint())
        .pipe(sasslint.format())
}

module.exports = {
    'admin-js': adminJS,
    'catalog-js': catalogJS,
    'admin-css': adminCSS,
    'catalog-css': catalogCSS,
    js: parallel(adminJS, catalogJS),
    css: parallel(catalogCSS, adminCSS),
    default: parallel(adminJS, catalogJS, adminCSS, catalogCSS),
    lint: lint,
    sasslint: stylelint,
    test: parallel(lint, stylelint),
}
