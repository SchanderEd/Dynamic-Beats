"use strict"

const { src, dest } = require("gulp");
const gulp = require("gulp");

const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const rigger = require("gulp-rigger");
const fileInclude = require('gulp-file-include');
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const sprites = require("gulp-svg-sprite");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const del = require("del");
const notify = require("gulp-notify");
const svgSprite = require("gulp-svg-sprite");
const browserSync = require("browser-sync").create();

/* Paths */
const srcPath = "src/";
const distPath = "dist/";

const path = {
  build: {
    html: distPath,
    css: `${distPath}assets/css/`,
    js: `${distPath}assets/js/`,
    images: `${distPath}assets/images/`,
    svg: `${distPath}assets/sprites/`,
    fonts: `${distPath}assets/fonts/`
  },
  src: {
    html: `${srcPath}*.html`,
    css: `${srcPath}assets/scss/*.scss`,
    js: `${srcPath}assets/js/*.js`,
    images: `${srcPath}assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
    svg: `${srcPath}assets/sprites/*.svg`,
    fonts: `${srcPath}assets/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
    srcPartialsFolder: `${srcPath}partials/**/*.html`
  },
  watch: {
    html: `${srcPath}*.html`,
    js: `${srcPath}assets/js/*.js`,
    css: `${srcPath}assets/scss/**/*.scss`,
    images: `${srcPath}assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
    svg: `${srcPath}assets/sprites/*.svg`,
    fonts: `${srcPath}assets/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
    srcPartialsFolder: `${srcPath}partials/**/*.html`
  },
  clean: `./${distPath}`
}

function serve() {
  browserSync.init({
    server: {
      baseDir: `./${distPath}`
    }
  });
}

function html() {
  return src(path.src.html, { base: srcPath })
    .pipe(plumber())
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest(path.build.html))
    .pipe(browserSync.reload({ stream: true }))
}

function css() {
  return src(path.src.css, { base: `${srcPath}assets/scss` })
    .pipe(plumber({
      errorHandler: function (err) {
        notify.onError({
          title: "SCSS Error",
          message: "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
    .pipe(cssnano({
      zindex: false,
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(removeComments())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }))
}

function js() {
  return src(path.src.js, { base: `${srcPath}assets/js/` })
    .pipe(plumber({
      errorHandler: function (err) {
        notify.onError({
          title: "JS Error",
          message: "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))
    .pipe(rigger())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({ stream: true }))
}

function images() {
  return src(path.src.images, { base: `${srcPath}assets/images/` })
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }), // От 0 до 7
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({ stream: true }))
}

function svgSprites() {
  return src(path.src.svg, { base: `${srcPath}assets/sprites/` })
    .pipe(plumber({
      errorHandler: function (err) {
        notify.onError({
          title: "Sprites Error",
          message: "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))

    .pipe(sprites({
      mode: {
        stack: {
          sprite: `../assets/sprites/sprite.svg`,
          example: true
        }
      }
    }))

    .pipe(dest(path.build.svg))
}

function fonts() {
  return src(path.src.fonts, { base: `${srcPath}assets/fonts/` })
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.reload({ stream: true }))
}

function clean() {
  return del(path.clean)
}

function watchFiles() {
  gulp.watch([path.watch.html], { usePolling: true }, html)
  gulp.watch([path.watch.srcPartialsFolder], { usePolling: true }, html)
  gulp.watch([path.watch.css], { usePolling: true }, css)
  gulp.watch([path.watch.js], { usePolling: true }, js)
  gulp.watch([path.watch.images], { usePolling: true }, images)
  gulp.watch([path.watch.svg], { usePolling: true }, svgSprites)
  gulp.watch([path.watch.fonts], { usePolling: true }, fonts)
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, svgSprites, fonts))
const watch = gulp.parallel(build, watchFiles, serve)

exports.html = html
exports.css = css
exports.js = js
exports.images = images
exports.svgSprites = svgSprites
exports.fonts = fonts
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch