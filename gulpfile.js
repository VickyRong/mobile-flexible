let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let reload = browserSync.reload;
let jsUglify = require('gulp-uglify');
let cssClean = require('gulp-clean-css');
let htmlMin = require('gulp-htmlmin');
let clean = require('gulp-clean');
let rev = require('gulp-rev');

gulp.task('default', ['serve']);

// 静态服务器 + 监听 scss/html 文件 实时更新
gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './public'
  });
  gulp.watch('public/sass/*.scss', ['sass']);
  gulp.watch('public/*.html').on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', () => {
  return gulp
    .src('public/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css')) //dest()方法 能输出文件，如果没有文件夹可以重新创建
    .pipe(reload({ stream: true }));
});

//压缩html
gulp.task('htmlMin', () => {
  return gulp
    .src('build/*.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build/'));
});

//压缩js
gulp.task('jsMin', () => {
  return gulp
    .src('build/js/*.js')
    .pipe(jsUglify())
    .pipe(gulp.dest('build/js'));
});

//压缩css
gulp.task('cssMin', () => {
  return gulp
    .src('build/css/*.css')
    .pipe(cssClean())
    .pipe(gulp.dest('build/css'));
});

//清除文件
gulp.task('clean', () => {
  return gulp
    .src('build/*', { read: false })
    .pipe(clean());
});

//清除文件缓存 生成md5哈希值 (先生成哈希值文件，再压缩文件)
gulp.task('rev', () => {
  return gulp
  .src(['public/css/*.css', 'public/js/*.js','public/*.html'], {base: 'public'})
  .pipe(rev())
  .pipe(gulp.dest('build/'))
  .pipe(rev.manifest())
  .pipe(gulp.dest('build/'))
});

//压缩合并
gulp.task('contact', () =>{
  gulp.start('jsMin', 'cssMin', 'htmlMin');
})

//打包
gulp.task('build', ['clean','rev'], () => {
  gulp.start('contact');
});
