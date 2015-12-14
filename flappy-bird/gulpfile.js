var gulp = require('gulp');

var jshint = require('gulp-jshint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// JavaScript linting task
gulp.task('jshint', function(){
	return gulp.src('js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){
	return browserify('js/flappy_bird.js')
	.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('build', ['jshint', 'scripts']);

