const { src, dest, watch, parallel } = require("gulp"); // i need this functions 
//css
const sass = require('gulp-sass')(require('sass')); //const sass = requiere("sass") this work only with sass // export 
const plumber = require('gulp-plumber');

//images
const cache = require('gulp-cache');
const imagemin = require( 'gulp-imagemin' );
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src("src/scss/**/*.scss") //src("src/scss/app.scss") //identify this file SASS
    .pipe(plumber())
    .pipe(sass()) //compile it
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

function dev(done) {
    watch("src/scss/**/*.scss", css)

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp,versionAvif, dev);

// don't forget to install gulp-sass check that ein gulp.com