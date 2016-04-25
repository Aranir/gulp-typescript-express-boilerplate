// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var merge = require('merge2')
var mocha = require('gulp-spawn-mocha');
var gutil = require('gulp-util');
var server = require('gulp-express');
var sourcemaps = require('gulp-sourcemaps');
var nodeInspector = require('gulp-node-inspector');
var shell = require('gulp-shell')





var tsProject = ts.createProject('tsconfig.json');

gulp.task('testbuild', function () {
	var test = gulp.src('test/*.ts')
		.pipe(ts(ts.createProject('tsconfig.json')))

	var src = gulp.src('src/*.ts')
		.pipe(ts(tsProject))

	return merge([
		test
			.pipe(gulp.dest('build/test')),
		src
			.pipe(gulp.dest('build/src'))
	]);
});

gulp.task('build', function() {
	var tsResult = gulp.src('src/**/*.ts')
	.pipe(sourcemaps.init())
	.pipe(ts(ts.createProject('tsconfig.json')))
	
	return tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('build/src'))
});

function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString());
  this.emit('end');
}

gulp.task('test', ['testbuild'], function () {
	return gulp.src('build/test/*.js', { read: false })
		.pipe(mocha({ reporter: 'nyan' }))
		.on('error', swallowError);
})

gulp.task('watch-test', ['testbuild', 'test'], function () {
    gulp.watch(['test/**/*.ts', 'src/**/*.ts'], ['test']).on('error', function(){});
});

gulp.task('server-run', ['build'], function () {
	server.run(['build/src/main.js']).pipe(nodeDebug());
})

gulp.task('server', ['build'], function () {
    // Start the server at the beginning of the task 
	server.run(['build/src/main.js']);
    gulp.watch(['src/**/*.ts'], ['build', 'server-run']);
});

gulp.task('debug', function() {
	return gulp.src('build/src/main.js', {read: false})
	.pipe(shell(['node-debug <%= file.path %>']))
})

gulp.task('shorthand', shell.task([
  'node-debug build/src/main.js'
]))

gulp.task('example', function () {
  return gulp.src('build/src/main.js', {read: false})
    .pipe(shell([
      'echo <%= file.path %>'
    ]))
})