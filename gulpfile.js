// Load plugins
var gulp = require('gulp'),
    path = require('path'),
    del = require('del'), // Deletes files & folders
    rename = require('gulp-rename'), // Allows renaming
    autoprefixer = require('gulp-autoprefixer'), // Adds CSS browser prefixes
    less = require('gulp-less'), // Less
    minifycss = require('gulp-minify-css'), // Minifies CSS
    webpack = require('gulp-webpack'), // Asset compiler. Currently only used for JS
    //imagemin = require('gulp-imagemin'), // Minifies images
    minifyhtml = require('gulp-minify-html'), // Minifies HTML
    browserSync = require('browser-sync'); // Sync browsers on different devices

// Default Task
gulp.task('default', taskDefault);

// Main Tasks
gulp.task('all', taskAll); // Do all tasks, except watch

// Sub Tasks
gulp.task('css', taskCss);
gulp.task('htmlMain', taskHtmlMain);
gulp.task('js', taskJs);
gulp.task('images', taskImages);

// Side Tasks
gulp.task('watch', taskWatch); // Watch for any changes in files and run tasks
gulp.task('sync', taskSync); // BrowserSync to reload on changes in files

/////////////////////////////////////
// Functions for all tasks below here
/////////////////////////////////////

function taskDefault() {
    console.log('Here are the current Gulp commands:');
    console.log('gulp all - Do all tasks, except watch');
    console.log('gulp css - Process all CSS');
    console.log('gulp js - Process all JS');
    console.log('gulp images - Process all images');
    console.log('gulp watch - Watch for any changes in files and run the appropriate task');
}

function taskAll() {
    gulp.start('htmlMain', 'css', 'images');
}

function taskCss() {
    gulp.start('css');
}

function taskCss() {
    return gulp.src('app/public-dev/css/*.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('app/public/css'));
}

function taskHtmlMain() {
    return gulp.src('app/public-dev/index.html')
        .pipe(minifyhtml({
            empty: true,
            cdata: true,
            comments: true,
            conditionals: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest('app/public'));
}

function taskJs() {
    return gulp.src('app/public-dev/js/app.jsx')
        .pipe(webpack({
            output: {
                filename: 'app.js'
            }
        }))
        .pipe('app/public/js');
}

function taskImages() {
    return gulp.src('app/public-dev/assets/*')
        //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('app/public/assets'));
}

function taskWatch() {
    monitor(false);
}

function taskSync() {
    monitor(true);
}

function monitor(isSync) {
    if(isSync){
        browserSync({
            proxy: 'http://localhost:3003'
        });
    }

    gulp.watch('app/public-dev/index.html', ['html', secondaryTask]);
    gulp.watch('app/public-dev/assets/*', ['images', secondaryTask]);
    gulp.watch('app/public-dev/js/*.jsx', ['js', secondaryTask]);

    console.log('So Gulp is now watching for changes, even though it will say "Finished". Just press CTRL+C to stop.');

    function secondaryTask() {
        if(isSync) {
            browserSync.reload();
        }
    }
}
