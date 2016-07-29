// 'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import cp from 'child_process';


var gutil = require('gulp-util');

const $ = gulpLoadPlugins();
const devDir = 'dev';
const appDir = 'app';


gulp.task('build:html',()=>{
    return gulp.src([
        `${devDir}/**/*.html`
    ],{
        
    }).pipe(gulp.dest(`${appDir}/static/html/`));
})

gulp.task('build:scss',()=>{
    
    var self = this;
    
    return gulp.src([
        `${devDir}/**/*.scss`
        ])
        .pipe($.plumber((error)=>{
            gutil.beep;
            gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
            this.emit('end');
        }))
        .pipe($.sass({outputStyle:'expanded'}))
        // .on('error', gutil.log)
        // .on('error', gutil.beep)
        .pipe($.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(`${appDir}/static/css/`))
})


gulp.task('watch',()=>{
    gulp.watch(`${devDir}/**/*.html`, ['build:html']);
    gulp.watch(`${devDir}/**/*.scss`, ['build:scss'])
})

gulp.task('default',()=>{
    console.log('default task')
})