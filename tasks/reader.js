/*
 * uplift-reader
 * https://github.com/mariusc23/uplift-reader
 *
 * Copyright (c) 2014 Marius Craciunoiu
 * Licensed under the MIT license.
 */

'use strict';

var reader = require('../lib/reader');
var _      = require('lodash');
var chalk  = require('chalk');
var util   = require('util');

module.exports = function (grunt) {
  grunt.registerMultiTask('upmin', 'Prepare grunt configs for concatenation.', function () {
    var that = this;

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      filter: function(file, key) {
        return file;
      }
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {

      // Iterate over each file
      _.forEach(file.src, function(fileSrc) {

        var fileContent = grunt.file.read(fileSrc);

        var build = reader.read(fileContent);

        // Uglify
        var uglifyFiles = {};

        _.forEach(build.$uglify, function(src, dest) {
          var filteredDest = options.filter.call(file, dest);
          var filteredSrc = _.map(src, function(url) {
            return options.filter.call(file, url);
          });
          uglifyFiles[filteredDest] = filteredSrc;
        });

        var uglifyConfig = {
          uglify: {
            upmin: {
              files: uglifyFiles
            }
          }
        };

        // Cssmin
        var cssminFiles = {};

        _.forEach(build.$cssmin, function(src, dest) {
          var filteredDest = options.filter.call(file, dest);
          var filteredSrc = _.map(src, function(url) {
            return options.filter.call(file, url);
          });
          cssminFiles[filteredDest] = filteredSrc;
        });

        var cssminConfig = {
          cssmin: {
            upmin: {
              files: cssminFiles
            }
          }
        };

        grunt.config.merge(uglifyConfig);
        grunt.config.merge(cssminConfig);

        grunt.verbose.writeln(chalk.cyan(chalk.underline('uglify:upmin')));
        grunt.verbose.writeln(util.inspect(uglifyConfig), {
          showHidden: false,
          depth: null
        });

        grunt.verbose.writeln(chalk.cyan(chalk.underline('cssmin:upmin')));
        grunt.verbose.writeln(util.inspect(cssminConfig), {
          showHidden: false,
          depth: null
        });

        if (file.dest) {
          try {
            grunt.file.write(file.dest, reader.replaceBuildAreas(fileContent));
          } catch(ex) {
            grunt.file.write(file.dest + fileSrc.replace(/^.*[\\\/]/, ''), reader.replaceBuildAreas(fileContent));
          }
        }

      });

    });

  });

};
