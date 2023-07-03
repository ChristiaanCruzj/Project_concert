const { src, dest, watch } = require("gulp"); // i need this functions 
const sass = require('gulp-sass')(require('sass')); //const sass = requiere("sass") this work only with sass // export 

function css(done) {
    src("src/scss/**/*.scss") //src("src/scss/app.scss") //identify this file SASS
    .pipe(sass()) //compile it
    .pipe(dest("build/css")) //store it on disk

    done(); //callback that notifies gulp when we reach the end
}

function dev(done) {
    watch("src/scss/**/*.scss", css)

    done();
}

exports.css = css;
exports.dev = dev;

// don't forget to install gulp-sass check that ein gulp.com