#gulp-tsc-autopath

This plugin is used to automatically gather your typescript references and prepend them to your source files. It's meant to be used in projects that don't use loading of modules with libraries like [require.js](http://requirejs.org/) or [browserify](http://browserify.org/), but instead has a single contatenated js file.

## Instalation

```shell
npm install --save-dev git://github.com/wirus15/gulp-tsc-autopath
```

## How does it work?

It creates a single temporary file containg references to all typescript files in your project. Then it appends a reference to this file to every single ```.ts``` files, so your whole project is wired up. The references are injected right before the compilation so none of the file are physically modified.

## Why?

Because I hate writing all those reference paths :)

## How to use it?

```javascript
var gulp        = require('gulp');
var typescript  = require('gulp-tsc');
var autopath  = require('gulp-tsc-autopath');

// modify original files by adding references
gulp.task('default', function() {
    gulp.src(['src/**/*.ts'])
        .pipe(autopath({ 
            referenceFile: '.tmp/typings/app.d.ts'
        }))
        .pipe(gulp.dest('src'));
});

// or add references before compilation without modifying files
gulp.task('default', function() {
    gulp.src(['src/**/*.ts'])
        .pipe(autopath({ 
            referenceFile: '.tmp/typings/app.d.ts'
        }))
        .pipe(typescript({
            out: 'index.js',
            sourcemap: true
        }))
        .pipe(gulp.dest('./dest'))
});
```

## Options
 - **referenceFile** [string, required] - path to a file containing all references
 - **additionalReferences** [array(strings), optional] - additional paths added to the reference file

## License

This open-sourced software is licensed under the [MIT license](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Maciej Krawczyk
