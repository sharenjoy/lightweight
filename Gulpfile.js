// Gulpfile
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var run = require('gulp-run');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var browserify = require('gulp-browserify');

var path = {
    app: 'app',
    config: 'config',
    resources: 'resources',
    vendor: 'vendor/sharenjoy/cmsharenjoy/src',
    root: 'public'
};

gulp.task('css', function()
{
    gulp.src(path.root + '/css/scss/main.scss')
        .pipe(sass({style: 'compressed'}))
        .on('error', notify.onError({
            title: "Error running something",
            message: "Error: <%= error.message %>"
        }))
        .pipe(gulp.dest(path.root + '/css'))
        .pipe(livereload());
});

gulp.task('js', function()
{
    gulp.src(path.root + '/js/main.js')
        .pipe(browserify({debug: true}))
        .on('error', notify.onError({
            title: "Error running something",
            message: "Error: <%= error.message %>"
        }))
        .pipe(rename(path.root + '/js/bundle.js'))
        .pipe(gulp.dest('./'))
        .pipe(livereload());
});

gulp.task('compress', function()
{
    gulp.src(path.root + '/js/bundle.js')
        .pipe(uglify())
        .pipe(rename(path.root + '/js/min.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function()
{
    gulp.watch([path.app + '/**/*.php',
                path.config + '/**/*.php',
                path.resources + '/**/*.php',
                path.vendor + '/**/*.php'
    ]);
    gulp.watch(path.root + '/js/**/*.js', ['js']);
    gulp.watch(path.root + '/css/scss/**/*.scss', ['css']);
});

gulp.task('default', ['watch']);

