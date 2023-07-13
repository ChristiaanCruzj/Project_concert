const { src, dest, watch, parallel } = require("gulp"); // i need this functions 
//css
const sass = require('gulp-sass')(require('sass')); //const sass = requiere("sass") this work only with sass // export 
const plumber = require('gulp-plumber');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// javascript
const terser = require('gulp-terser-js');

//images
const cache = require('gulp-cache');
const imagemin = require( 'gulp-imagemin' );
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src("src/scss/**/*.scss") //src("src/scss/app.scss") //identify this file SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass()) //compile it
    .pipe( postcss([autoprefixer(),cssnano]))
    .pipe(sourcemaps.write('.')) //the same location
    .pipe(dest("build/css")) //store it on disk

    done(); //callback that notifies gulp when we reach the end
}

function imagenes( done ) {
    const options = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache(imagemin(options)) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp ( done ) {
    const options = {
        quality: 50
    };
    src( 'src/img/**/*.{png,jpg}' )
        .pipe( webp(options) )
        .pipe( dest( 'build/img' ))
    done();
}
function versionAvif ( done ) {
    const options = {
        quality: 50
    };
    src( 'src/img/**/*.{png,jpg}' )
        .pipe( avif(options) )
        .pipe( dest( 'build/img' ))
    done();
}

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe(terser())
        .pipe(dest('build/js'));
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp,versionAvif, javascript,dev);

// don't forget to install gulp-sass check that ein gulp.com