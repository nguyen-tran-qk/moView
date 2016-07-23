var elixir = require('laravel-elixir');
require('./tasks/angular.task.js');
require('./tasks/bower.task.js');
require('laravel-elixir-livereload');

var gulp = require('gulp');

gulp.task('build', function() {
  var Elixir = require('laravel-elixir');
  var inSequence = require('run-sequence');
  var _ = require('underscore');
  Elixir(function(mix) {
    mix
      .bower()
      .angular('./angular/')
      .sass('./angular/styles/app.scss', 'public/styles')
      .copy('./angular/fonts', 'public/styles')
      .copy('./angular/images', 'public/images')
      .livereload([
        'public/scripts/vendor.js',
        'public/scripts/app.js',
        'public/styles/vendor.css',
        'public/styles/app.css',
      ], {liveCSS: true});
      // .phpUnit();
  });
  inSequence.apply(this, _.pluck(Elixir.tasks, 'name'));
});

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
  mix
    .bower()
    // .template('./angular/')
    .angular('./angular/')
    .sass('./angular/styles/app.scss', 'public/styles')
    .copy('./angular/fonts', 'public/styles')
    .copy('./angular/images', 'public/images')
    .copy('./angular/views', 'public/views')
    .livereload([
      'public/scripts/vendor.js',
      'public/scripts/app.js',
      'public/styles/vendor.css',
      'public/styles/app.css',
      'public/views/**/*.html'
    ], {liveCSS: true});
    // .phpUnit();
});
