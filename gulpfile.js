const { src, dest, parallel, watch } = require('gulp')
const concat = require('gulp-concat');
const iife = require('gulp-iife');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const insert = require('gulp-insert');

// @TODO: similar tasks for CSS

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

exports['admin-js'] = adminJS
exports['catalog-js'] = catalogJS
exports.js = parallel(adminJS, catalogJS)
exports.default = parallel(adminJS, catalogJS)
