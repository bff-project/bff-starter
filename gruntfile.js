module.exports = function(grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  const sass = require('node-sass');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          open: true,
          hostname: 'localhost',
          port: 9999
        }
      }
    },

    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          'css/main.css' : 'css//scss/main.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: {
          port: 35728
        }
      },
      html: {
        files: [
          'app/**/*.*',
          'fonts/**/*.*',
          'js/**/*.*',
          'images/**/*.*'
        ]
      },
      css: {
        files: ['css/scss/**/*.scss'],
        tasks: ['compile']
      }
    },

    clean: {
      build: {
        src: ['.tmp']
      },
    },

    //
    copy: {
      main: {
        files: [
          {
            expand: true,
            src:
              [ 'index.html',
                'app/**',
                'css/*.css',
                'fonts/**',
                'images/**',
                'js/**',
                'node_modules/jquery/dist/jquery.js',
                'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
                'node_modules/handlebars/dist/handlebars.js',
                'node_modules/faker/build/build/faker.js',
                'node_modules/font-awesome/css/font-awesome.css',
                'node_modules/font-awesome/fonts/**',
              ],
            dest: '.tmp'
          }
        ]
      }
    },

    //shell: {
    //  deploy: {
    //    command: "rsync --exclude-from '.deploy-exclude' -avz --chmod=ugo=rwX --delete --omit-dir-times ./.tmp/ " + deployCredentials.username + "@remote-host.com:/remote/path"
    //  }
    //},

    jsDebugify: {
      options: {
        javaScriptFiles: [
          'js/app/**/*.js'
        ]
      }
    }
  });

  grunt.registerTask('jsDebugify', 'Auto-names the evaluated JavaScript files (via source mapping) for better debuggability', function () {
    // Get an expanded list of file paths to all application JavaScript files
    var options = this.options();
    var javaScriptFiles = options.javaScriptFiles;
    var fileNames = grunt.file.expand(javaScriptFiles);

    // Get the operating system-specific newline character for file I/O
    var newline = grunt.util.linefeed;

    // Define the prefix used to name the JavaScript files (source mapping)
    var sourceMappingPrefix = '//# sourceURL=';

    // Append browser-detectable file names to all evaluated JavaScript files in BFF
    fileNames.forEach(function (fileName) {
      var fileContent = grunt.file.read(fileName);

      // Guard against appending the name to the same file multiple times
      if (fileContent.search(sourceMappingPrefix) < 0) {
        // Append the name to the JavaScript file that will appear in Chrome Developer Tools, Firebug, etc.
        var footer = sourceMappingPrefix + fileName;
        var formattedFileContent = fileContent + newline + newline + footer;

        // Update the JavaScript with the formatted content
        grunt.file.write(fileName, formattedFileContent);

        // Notify the user that we have updated this file
        grunt.log.writeln('Appended "//# sourceURL=[filename]" to file: ' + fileName);
      }
    });
  });

  grunt.registerTask('default', ['jsDebugify', 'connect', 'watch']);
  grunt.registerTask('compile', ['sass']);
  grunt.registerTask('server',  ['connect', 'watch']);
  grunt.registerTask('deploy',  ['sass', 'clean', 'copy', 'shell:deploy']);
  grunt.registerTask('build',   ['sass', 'clean', 'copy']);
};
