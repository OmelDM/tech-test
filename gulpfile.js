"use strict";

var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	deploy = require('gulp-gh-pages');

var BUILD_DIR = './build/',
	HTML_PATH = './sources/*.html',
	STYLESHEETS_PATHS = './sources/style/*.sass',
	ASSETS_DIR = './assets/**/*',
	JS_PATHS = [
		'./node_modules/barba.js/dist/barba.js',
		'./sources/js/**/*.js'
	];

gulp.task('default', ['html', 'css', 'js', 'assets', 'connect', 'watch']);
gulp.task('build', ['html', 'css', 'js', 'assets']);

gulp.task('deploy', ['default'], function () {
  return gulp.src("./build/**/*")
    .pipe(deploy())
});

gulp.task('html', function() {
	return gulp.src(HTML_PATH)
		.pipe(gulp.dest(BUILD_DIR))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	return gulp.src(STYLESHEETS_PATHS)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(concat('style.css'))
		.pipe(gulp.dest(BUILD_DIR))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	return gulp.src(JS_PATHS)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(BUILD_DIR))
		.pipe(connect.reload());
});

gulp.task('assets', function() {
	return gulp.src(ASSETS_DIR)
		.pipe(gulp.dest(BUILD_DIR + 'assets/'))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: BUILD_DIR,
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch([HTML_PATH, JS_PATHS, STYLESHEETS_PATHS, ASSETS_DIR], ['html', 'css', 'js', 'assets']);
});
