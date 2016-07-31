// 'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
// import browserSync from 'browser-sync';
import cp from 'child_process';




var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');

const $ = gulpLoadPlugins();
const devDir = 'dev';
const appDir = 'app';


gulp.task('browser-sync', () => {

})



gulp.task('build:html', () => {
    return gulp.src([
        `${devDir}/**/*.html`
    ], {

        }).pipe(gulp.dest(`${appDir}/static/html/`))
        .pipe(browserSync.reload({ stream: true }));
})

gulp.task('build:scss', () => {
    return gulp.src([
        `${devDir}/**/index.scss`
    ])
        .pipe($.plumber({
            errorHandler: function (error) {
                gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
                this.emit('end');
            }
        }))
        .pipe($.sass({ outputStyle: 'expanded' }))
        .pipe($.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(`${appDir}/static/css/`))
        .pipe(browserSync.reload({ stream: true }));
})

// gulp.task('watch', ['build:html', 'build:scss'], () => {
//     gulp.watch(`${devDir}/**/*.html`, ['build:html'])
//         .on('change', () => {
//             // console.log('s-o schimbat');
//             // browserSync.reload;
//         });
//     gulp.watch(`${devDir}/**/*.scss`, ['build:scss'])
// })


gulp.task('Run:Python:Server',['build:html', 'build:scss'],()=>{
    return cp.exec('python run.py');
});


gulp.task('serve', ['Run:Python:Server'], () => {
    browserSync.init({
        // server: {
        //     baseDir: "./app/"
        // }
        proxy: "localhost:4000"
    });

    gulp.watch(`${devDir}/**/*.html`, ['build:html'])
    gulp.watch(`${devDir}/**/*.scss`, ['build:scss']);
})




gulp.task('default',['serve'], () => {

})