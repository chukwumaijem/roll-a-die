'use strict';

let gulp = require('gulp');

let browserify = require('browserify');
let buffer = require('vinyl-buffer');
let gutil = require('gulp-util');
let jest = require('jest-cli');
let less = require('gulp-less');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');
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
        standalone: 'dice3d',
    },
};

/**
 * Default task
 */
gulp.task('default', ['test', 'dist']);

/**
 * Utilities
 */
var _bundle = function(b) {
    return b.bundle()
        .on('error', function(e) {
            notify.onError.call(this, '[Browserify] <%= error.message %>');
            gutil.log('Browserify Error', e);
        })
        .pipe(source('dice3d.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist'))
        .pipe(notify('[Browserify] Generated <%= file.relative %>'));
};

/**
 * Build for distribute
 */
gulp.task('dist:script', function() {
    let b = browserify(CONFIG.browserify);
    return _bundle(b);
});

gulp.task('dist:style', function() {
    return gulp.src('./less/dice3d.less')
        .pipe(plumber({
            errorHandler: notify.onError('[LESS] <%= error.message %>'),
        }))
        .pipe(less())
        .pipe(gulp.dest('dist'))
        .pipe(notify('[LESS] Generated <%= file.relative %>'));
});

gulp.task('dist', ['dist:script', 'dist:style']);

/**
 * Test using Jest
 */
gulp.task('test', function(callback) {
    var _write = process.stdout.write;
    var output = '';
    process.stdout.write = function(str) {
        if (str && str.match(/^{.*}$/)) {
            output += str;
        } else {
            _write.apply(this, arguments);
        }
    };

    jest.runCLI({ json: true, }, __dirname, function(success) {
        process.stdout.write = _write;

        var data;
        try {
            data = JSON.parse(output);
        } catch (e) {
            notify.onError('<%= error.message %>').call(new Buffer(''), e);
            return callback();
        }

        var endTime = data.testResults.length ? data.testResults
            .map(r => r.endTime)
            .reduce(Math.max.bind(Math)) : Date.now();
        var time = (endTime - data.startTime) / 1000;

        var result = `${data.numPassedTests} test passed (${data.numTotalTests} total in ${data.numTotalTestSuites}, run time ${time}s)`;
        if (data.numFailedTests) result = `${data.numFailedTests} test failed, ${result}`;
        result = `[TEST] ${result}`;

        var logLevel = notify.logLevel();
        notify.logLevel(0);
        if (success) {
            notify('<%= file.message %>', { onLast: false})
                ._transform({ message: result }, null, () => callback);
        } else {
            data.testResults
                .filter(r => !r.success)
                .map(r => r.message)
                .forEach(function (message) {
                    var _message = message.replace(/\u001b\[[0-9]*m/g, '').substr(0, 1000);
                    notify.onError('<%= error.message %>', function() {}).call(new Buffer(''), new Error(_message));
                });

            notify.onError('<%= error.message %>', function() {}).call(new Buffer(''), new Error(result));
        }
        notify.logLevel(logLevel);

        return callback();
    });
});

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

gulp.task('watch:style', function() {
    return gulp.watch(['less/**/*'], ['dist:style']);
});

gulp.task('watch:test', function() {
    return gulp.watch(['__mocks__/**/*', '__tests__/**/*', 'js/**/*'], ['test']);
});

gulp.task('watch', ['watch:script', 'watch:style', 'watch:test']);
