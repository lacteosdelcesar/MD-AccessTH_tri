'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

var modRewrite  = require('connect-modrewrite');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: [
        middleware,
        modRewrite([
          '^[^\\.]*$ /index.html [L]'
        ])
      ],
      routes: routes
    },
    port: 3000,
    browser: browser
  });
}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    paths.tmp + '/serve',
    paths.src
  ], [
    paths.tmp + '/serve/app/**/*.css',
    paths.src + '/app/**/*.js',
    paths.src + 'src/assets/images/**/*',
    paths.tmp + '/serve/*.html',
    paths.tmp + '/serve/app/**/*.html',
    paths.src + '/app/**/*.html'
  ]);
});

gulp.task('serve:dist', ['buildapp'], function () {
  browserSyncInit(paths.dist);
});
