var gulp = require('gulp'),
    elixir = require('laravel-elixir'),
    concat = require('gulp-concat'),
    declare = require('gulp-declare'),
    wrap = require('gulp-wrap'),
    handlebars = require('gulp-handlebars');

var task = elixir.Task;

elixir.extend('handlebars', function (src, options) {

    var config =  {
        src: src || 'resources/assets/js/templates/*.hbs',
        outputDir: options.outputDir || 'public/js/',
        outputFile: options.outputFile || 'templates.js',
        nameSpace: options.nameSpace || 'app.templates'
    };

    new task('handlebars', function(){
        return gulp.src(config.src)
            .pipe(handlebars())
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            .pipe(declare({
                namespace: config.nameSpace,
                noRedeclare: true
            }))
            .pipe(concat(config.outputFile))
            .pipe(gulp.dest(config.outputDir));
    }).watch(config.src);
});
