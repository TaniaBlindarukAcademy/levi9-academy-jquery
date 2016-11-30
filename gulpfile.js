/**
 * Created by tania on 30.11.16.
 */

var gulp = require('gulp');
var requirejsOptimize = require('gulp-requirejs-optimize');
var watch = require('gulp-watch');
var batch = require('gulp-batch');


gulp.task('default', ['watch']);

gulp.task('scripts', function () {
    return gulp.src('app.js')
        .pipe(requirejsOptimize({
            optimize: 'none',
            mainConfigFile: 'app.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    watch('js/*.js', batch(function (events, done) {
        gulp.start('scripts', done);
    }));
    watch('app.js', batch(function (events, done) {
        gulp.start('scripts', done);
    }));
});