var gulp        = require('gulp'),
	watch       = require('gulp-watch'),
	browserSync = require("browser-sync").create(),
	reload      = browserSync.reload;

var config = {
	server: {baseDir: "./"},
	port: 9000,
	open: true
};

gulp.task('watch', function () {
	gulp.watch(['index.html', 'main.js', 'style.css']).on('change', reload);
});

gulp.task('default', ['watch'], function () {
	browserSync.init(config);
});
