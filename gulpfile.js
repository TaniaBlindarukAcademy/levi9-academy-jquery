/**
 * Created by tania on 30.11.16.
 */

var gulp = require('gulp');
var requirejsOptimize = require('gulp-requirejs-optimize');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');


gulp.task('default', ['scripts','transpile','watch']);

gulp.task('scripts', function () {
    return gulp.src('app.js')
        .pipe(requirejsOptimize({
            optimize: 'none',
            mainConfigFile: 'app.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('transpile',function(){
    return gulp.src('./dist/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/es5'));
});

gulp.task('watch', function () {
    watch('js/*.js', batch(function (events, done) {
        gulp.start('scripts', done);
    }));
    watch('app.js', batch(function (events, done) {
        gulp.start('scripts', done);
    }));
    watch('dist/app.js', batch(function (events, done) {
        gulp.start('transpile', done);
    }));
});



