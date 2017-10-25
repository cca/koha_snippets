const gulp = require('gulp')
const concat = require('gulp-concat');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const insert = require('gulp-insert');

// @TODO: similar tasks for CSS

gulp.task('admin-js', () => {
    return gulp.src('admin-js/*.js')
        .pipe(concat('IntranetUserJS.js'))
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify())
        .pipe(insert.prepend(`// minified ${Date()} - see https://github.com/cca/koha_snippets\n`))
        .pipe(gulp.dest('dist'))
})

gulp.task('catalog-js', () => {
    return gulp.src('catalog-js/*.js')
        .pipe(concat('OPACUserJS.js'))
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify())
        .pipe(insert.prepend(`// minified ${Date()} - see https://github.com/cca/koha_snippets\n`))
        .pipe(gulp.dest('dist'))
})

gulp.task('js', [ 'admin-js', 'catalog-js' ]);
gulp.task('default', [ 'js' ]);
