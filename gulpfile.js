// gulpfile.js
// This is where you can add new dependancies

const gulp = require('gulp');
const serve = require('gulp-serve');
const markdown = require('gulp-markdown');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const log = require('gulplog');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

var config = require ("./config.json"); 

gulp.task('static', function() {
    gulp.src('/README.md')
        .pipe(markdown())
        .pipe(gulp.dest('docs'))	
  
});
 
gulp.task('test', function() {
  return console.log( 'test', config.test );
});

// gulp.task('serve', serve({
//   root: ['docs'],
//   port: 8080,
//   middleware: function(req, res) {
//     // custom optional middleware
//   }
// }));

gulp.task("watch", function () {
	gulp.watch("README.md", gulp.series('static'))
	gulp.watch("src/javascript/*", gulp.series('js'))
});

// gulp.task('browserSync', function() {
//   browserSync.init({
//     server: {
//       baseDir: 'docs'
//     },
//   })
// })

gulp.task('js', function () {

  return gulp.src('src/javascript/*.js', {read: false}) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
    .pipe(tap(function (file) {

      log.info('bundling ' + file.path);

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {debug: true}).bundle();

    }))

    // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
    .pipe(buffer())

    // load and init sourcemaps
    .pipe(sourcemaps.init({loadMaps: true}))

    // .pipe(uglify())

    // write sourcemaps
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest('docs'));

});

// // Define the default task as a sequence of the above tasks
// // Additionally, enable production build on any task by adding "--prod"
// gulp.task('build', ['clean'], function() {
//     gulp.start('extras', 'scripts', 'styles', 'images', 'templates', 'subDirectories', 'rename');
// });

// gulp.task('default', ['clean'], function() {
//     gulp.start('extras', 'scripts', 'styles', 'images', 'templates', 'subDirectories',  'watch', 'open');
// });