import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import browser from 'browser-sync';
import bower from 'main-bower-files';

let $ = plugins();
let server = browser.create();
let webpackConfig = {
  context: `${__dirname}/app/react`,
  entry: './app.react.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{test: /\.js$/, loader: 'babel-loader'}]
  }
};

gulp.task('default', ['server', 'watch']);

gulp.task('server', ['build'], () => {
  server.init({
    port: 8888,
    server: {
      baseDir: '.app'
    },
    notify: false,
    ghostMode: false,
    browser: 'google chrome'
  });
});

gulp.task('reload', () => {
  server.reload();
});

gulp.task('watch', () => {
  gulp.watch(['.app/*'], ['reload']);
  gulp.watch(['app/index.html'], ['html']);
  gulp.watch(['app/react/*.js'], ['webpack']);
  gulp.watch(['app/css/*.css'], ['css']);
});

gulp.task('build', ['component', 'html', 'webpack', 'css']);

gulp.task('component', () => gulp.src(bower())
  .pipe(gulp.dest('.app'))
);

gulp.task('html', () => gulp.src('app/index.html')
  .pipe(gulp.dest('.app'))
);

gulp.task('webpack', () => gulp.src('')
  .pipe($.webpack(webpackConfig))
  .pipe($.uglify())
  .pipe(gulp.dest('.app'))
);

gulp.task('css', () => gulp.src('app/css/*.css')
  .pipe(gulp.dest('.app'))
);

gulp.task('deloy', () => {
  let pkg = require('./package.json');
  let ghPagesConfig = {
    remoteUrl: pkg.repository.url
  };

  return gulp.src('.app/**/*')
    .pipe($.ghPages(ghPagesConfig));
});
