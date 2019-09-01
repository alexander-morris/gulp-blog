// gulpfile.js
// This is where you can add new dependancies

const gulp        = require('gulp');
const serve       = require('gulp-serve');
const markdown    = require('gulp-markdown');
const browserSync = require('browser-sync').create();
const browserify  = require('browserify');
const log         = require('gulplog');
const tap         = require('gulp-tap');
const buffer      = require('gulp-buffer');
const sourcemaps  = require('gulp-sourcemaps');
const uglify      = require('gulp-uglify');
const gutil       = require('gulp-util');
const es          = require('event-stream');

var plugins = require('gulp-load-plugins')({
    camelize: true
});

const config = require ("./config.json"); 

var isProduction = (gutil.env.prod === true ? true : false);
var date = new Date();
var nicedate = date.toISOString().replace(/(\-|:|\.)/g, '');

/* To-Do
	1. Add event stream support
	3. Add templates for header / footer & script sections
	4. Add template selection for header / footer sections
	5. Reduce index.js size from 4MB to something more appropriate
	6. Fix clean function
*/

// gulp.task('clean', function() {
//     return gulp.src(config.basePaths.dest)
//         .pipe(plugins.clean());
// });

gulp.task('static', function() {
	    return gulp.src('./src/pages/*.md')
	        .pipe( markdown() )
	        .pipe( gulp.dest('docs') )	
  			.pipe( plugins.inject(
	          gulp.src( config.basePaths.components, {read: false}) ) )
});
 
gulp.task('test', function() {

  	console.log( 'test', config.test )
  	return function () { return null }
  	
});

gulp.task("watch", function () {
	// plugins.connect.server({
 //        livereload: true,
 //        port: config.SERVER_PORT,
 //        root: config.basePaths.dest
 //    });

	gulp.watch( "src/pages/*", gulp.series('static') )
	gulp.watch( "src/javascript/*", gulp.series('js') )

});

gulp.task('js', function () {

  return gulp.src( 'src/javascript/*.js', { read: false } ) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
    .pipe( tap( function ( file ) {

      log.info( 'bundling ' + file.path );

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: true}).bundle();

    }))

    // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
    .pipe( buffer() )

    // load and init sourcemaps
    .pipe( sourcemaps.init( { loadMaps: true} ) )

    // .pipe(uglify())

    // write sourcemaps
    .pipe( sourcemaps.write( './' ) )

    .pipe( gulp.dest( config.basePaths.dest ) );

});

gulp.task('run', gulp.series('static', 'js', 'watch'))

// // Define the default task as a sequence of the above tasks
// // Additionally, enable production build on any task by adding "--prod"
// gulp.task('build', ['clean'], function() {
//     gulp.start('extras', 'scripts', 'styles', 'images', 'templates', 'subDirectories', 'rename');
// });

// gulp.task('default', ['clean'], function() {
//     gulp.start('extras', 'scripts', 'styles', 'images', 'templates', 'subDirectories',  'watch', 'open');
// });