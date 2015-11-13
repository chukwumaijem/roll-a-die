'use strict';

let gulp = require('gulp');

let browserify = require('browserify');
let buffer = require('vinyl-buffer');
let gutil = require('gulp-util');
let notify = require('gulp-notify');
let source = require('vinyl-source-stream');
let watchify = require('watchify');
let webserver = require('gulp-webserver');

/**
 * Configurations
 */
const CONFIG = {
    browserify: {
        entries: 'js/dice3d.js',
        debug: true,
        transform: 'babelify',
    },
};

/**
 * Utilities
 */
var _bundle = function(b) {
    return b.bundle()
        .on('error', function(e) {
            notify.onError.call(this, '[Browserify] <%= error.message =>');
            gutil.log('Browserify Error', e);
        })
        .pipe(source('dice3d.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist'))
        .pipe(notify('[Browserify] Generated <%= file.relative %>'));
};

/*
 * Build for distribute
 */
gulp.task('dist:script', function() {
    let b = browserify(CONFIG.browserify);
    return _bundle(b);
});

gulp.task('dist', ['dist:script']);
gulp.task('default', ['dist']);

/**
 * Watch
 */
let b = browserify(Object.assign({}, CONFIG.browserify, {
    plugin: 'watchify',
}));
let bundle = function() {
    return _bundle(b);
};
b.on('update', bundle);
b.on('log', gutil.log);

gulp.task('watch:script', bundle);

gulp.task('watch', ['watch:script']);
