'use strict';

var through = require('through2');
var path = require('path');
var fs = require('fs');

function autopath(options) {

    var referenceFile = options.referenceFile;

    fs.writeFileSync(referenceFile, '');
    if (options.additionalReferences) {
        options.additionalReferences.forEach(function(reference) {
            fs.appendFile(referenceFile, createReference(reference), fsCallback);
        });
    }

    return through.obj(function (file, enc, callback) {
        var referencePath = relativePath(referenceFile, file.path);
        var typingsPath = relativePath(file.path, referenceFile);

        fs.appendFile(referenceFile, createReference(referencePath), fsCallback);

        var contents = file.contents.toString();
        var reference = createReference(typingsPath);

        if (contents.indexOf(reference) === -1) {
            file.contents = new Buffer(reference + contents);
        }

        this.push(file);
        callback();
    });

    function createReference(path) {
        return "/// <reference path=\"" + path + "\" />\n";
    }

    function fsCallback(err) {
        if (err) throw err;
    }

    function relativePath(from, to) {
        return path.join(
            path.relative(path.dirname(from), path.dirname(to)),
            path.basename(to)
        )
    }
}

module.exports = autopath;
