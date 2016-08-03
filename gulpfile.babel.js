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

        })
        // .pipe($.htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest(`${appDir}/static/html/`))
        .pipe(browserSync.reload({ stream: true }));
})

gulp.task('build:scss', () => {
    return gulp.src([
        `${devDir}/**/index.scss`,
        `${devDir}/**/hover_desktop.scss`,
    ])
        .pipe($.plumber({
            errorHandler: function (error) {
                gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
                this.emit('end');
            }
        }))
        .pipe($.sass({ outputStyle: 'expanded' }))
        .pipe($.shorthand())
        .pipe($.autoprefixer({
            browsers: [
                'Android 2.3',
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24', // Firefox 24 is the latest ESR
                'Explorer >= 8',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6'
            ],
            cascade: false
        }))
        // .pipe($.csso())
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


gulp.task('Run:Python:Server', ['build:html', 'build:scss'], () => {
    return cp.exec('python run.py');
});


gulp.task('serve', ['Run:Python:Server'], () => {
    browserSync.init({
        // server: {
        //     baseDir: "./app/"
        // }
        proxy: "192.168.1.68:4000"
    });

    gulp.watch(`${devDir}/**/*.html`, ['build:html'])
    gulp.watch(`${devDir}/**/*.scss`, ['build:scss']);
})




gulp.task('default', ['serve'], () => {

})