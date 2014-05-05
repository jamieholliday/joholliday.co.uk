var gulp = require('gulp'),
	refresh = require('gulp-livereload'),
	sass = require('gulp-sass'),
	lr = require('tiny-lr'),
	http = require('http'),
	ecstatic = require('ecstatic');

	server = lr();

var paths = {
	styles: {
		src: 'scss/*.scss',
		dest: 'css'
	},
	html: {
		src: 'index.html'
	}
};

gulp.task('default', function() {
	http.createServer(
		ecstatic({ root: __dirname + '/' })
	).listen(8080);

	console.log('listening on port 8080');

	gulp.run('lr-server', 'styles', 'html');


	gulp.watch(paths.styles.src, ['styles']);
	gulp.watch(paths.html.src, ['html']);
});

//opens browser window
gulp.task('open', function() {
	gulp.src(paths.html.src)
	.pipe(open('', {url: 'http://localhost:8080'}));
	//need to refresh page and click lr icon to get livereload fully working
});

//runs sass task and live reload on scss changes
gulp.task('styles', function() {
	return gulp.src(paths.styles.src)
		.pipe(sass({ 
				sourceComments: 'map',
				includePaths : [paths.styles.src]
			}
		))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(refresh(server));
});

//runs livereload on html changes
gulp.task('html', function() {
	return gulp.src(paths.html.src)
		.pipe(refresh(server));
});

//live reload server
gulp.task('lr-server', function() {
	server.listen(35729, function(err) {
		if(err) return console.log(err);
	});
});