'use strict';
var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

gulp.task('jsTransform', function(){
    console.log('js wird neu generiert');
    // Auswahl der Ausgangsdateien
    return gulp.src([
        '../dev/core/namespace.js',
        '../dev/core/messageBroker.js',
        '../dev/core/navigator.js',
        '../dev/controller/**/*',
        '../dev/view/javascript/**/*'
    ])
    //Verkettung der Dateien
        .pipe(concat('ideaWatchers.js'))
        //schreiben der Dateien auf Festplatte
        .pipe(gulp.dest('../dist/private'))
        // Datei in Strom umbenennen
        .pipe(rename('ideaWatchers.min.js'))
        // minifizieren
        .pipe(uglify())
        // auf Festplatte schreiben
        .pipe(gulp.dest('../dist/public'));
});

//region less -> css
gulp.task('less', function () {
    console.log('less -> css');
    return gulp.src(['../dev/view/less/concat/ideaWatchers.less'])
        .pipe(less())
        .pipe(gulp.dest('../dist/private'));
});
//endregion

//region compress css
// in Eckigen Klammern können Tasks angegebne werden, die vor beginn des
// aktuellen Tasks ausgeführt werden sollen
gulp.task('minicss', ['less'], function () {
    console.log('minifiziere css ...');
    return gulp.src('../dist/private/ideaWatchers.css')
        .pipe(cssnano())
        .pipe(rename('ideaWatchers.min.css'))
        .pipe(gulp.dest('../dist/public'));
});
//endregion

gulp.task('buildAll', ['jsTransform', 'minicss'], function(){
    console.log('Javascript und CSS minimiert und HTML neu zusammengebaut');
    // Auswahl der Ausgangsdateien -> Reihenfolge wichtig!
    return gulp.src([
        '../dev/view/html/head.html',
        '../dev/view/html/login-view.html',
        '../dev/view/html/ideaList-view.html',
        '../dev/view/html/ideaDetails-view.html',
        '../dev/view/html/ideaCreation-view.html',
        '../dev/view/html/profile-view.html',
        '../dev/view/html/profileEdit-view.html',
        '../dev/view/html/impress-view.html',
        '../dev/view/html/foot.html'
    ])
    //Verkettung der Dateien
        .pipe(concat('ideaWatchers.html'))
        // auf Festplatte schreiben
        .pipe(gulp.dest('../dist/public'));
});