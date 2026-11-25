/* Лабораторна №13. Grebenuk, 305-ТН, №07.
   src — вихідні файли; dist — готовий сайт. */
'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const path = require('node:path');
const { finished } = require('node:stream/promises');

const paths = {
  html: 'src/**/*.html',
  scss: 'src/scss/**/*.scss',
  scripts: ['src/js/navigation.js', 'src/js/catalog.js'],
  images: 'src/images/**/*.{png,jpg,jpeg,gif,svg}',
  output: 'dist'
};

// Видалення обмежене лише власною папкою dist цього проєкту.
async function clean() {
  const project = path.resolve(__dirname);
  const target = path.resolve(__dirname, paths.output);
  if (target !== path.join(project, 'dist')) throw new Error('Некоректна папка збірки');
  const { deleteAsync } = await import('del');
  return deleteAsync(['dist'], { cwd: project });
}

// SCSS → CSS, перейменування, окрема стиснена версія.
function styles() {
  return gulp.src('src/scss/app.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(cssnano({ zindex: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
}

// Конкатенація двох JS-файлів та стиснення результату.
function scripts() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
}

function html() {
  return gulp.src(paths.html, { base: 'src' }).pipe(gulp.dest(paths.output));
}

// encoding:false зберігає двійкові PNG/JPEG у Gulp 5 без пошкодження.
async function images() {
  const { default: imagemin, optipng } = await import('gulp-imagemin');
  const stream = gulp.src(paths.images, { base: 'src/images', encoding: false })
    .pipe(imagemin([
      optipng({ optimizationLevel: 3 })
    ], { verbose: true }))
    .pipe(gulp.dest('dist/images'));
  await finished(stream);
}

// Повторна збірка реагує також на видалення файлів.
// queue:true не допускає накладання двох очищень dist.
function watchFiles() {
  return gulp.watch(['src/**/*'], { ignoreInitial: true, queue: true }, build);
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, html, images));
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.build = build;
exports.watch = gulp.series(build, watchFiles);
exports.default = gulp.series(build, watchFiles);
