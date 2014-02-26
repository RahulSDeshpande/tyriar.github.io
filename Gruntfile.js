module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dist: {
        files: {
          'scripts/site.js': [
            '__scripts/search.js',
            '__scripts/share.js',
            '__scripts/prettify.js',
            '__scripts/prettify-lang-css.js',
            '__scripts/prettify-lang-dart.js',
            '__scripts/prettify-lang-sql.js',
            '__scripts/prettify-init.js',
            '__scripts/sort-primary-tags.js',
            '__scripts/mathjax-config.js' 
          ],
          '_gen/includereplace/tag-names.js': [ 
            '__scripts/tag-names.js'
          ],
          '_gen/includereplace/google-analytics.js': [ 
            '__scripts/google-analytics.js'
          ],
          '_gen/includereplace/fusion-ad.js': [ 
            '__scripts/fusion-ad.js'
          ],
          'scripts/tag-search.js': [
            '__scripts/tag-container-toggle.js',
            '__scripts/tag-search.js'
          ],
          'scripts/demos/pathfinding-visualiser.js': [
            '__scripts/demos/pathfinding-visualiser.js'
          ]
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/styles.css': '__sass/styles.scss',
          '_gen/includereplace/inline.css': '__sass/inline.scss'
        }
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '__includes/',
          src: ['*.html'],
          dest: '_includes/',
          ext: '.html'
        }, {
          expand: true,
          cwd: '__layouts/',
          src: ['default.html'],
          dest: '_layouts/',
          ext: '.html'
        }],
        options: {
          collapseWhitespace: true
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '__images',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      },
    },
    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false },
          { mergePaths: false }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '__images',
          src: ['**/*.svg'],
          dest: 'images/'
        }]
      },
    },
    copy: {
      layouts: { // Copy layouts over first as not all are being minified
        files: [{
          expand: true,
          cwd: '__layouts/',
          src: ['*.html'],
          dest: '_layouts/'
        }]
      },
      animsvg: {
        files: [{
          expand: true,
          cwd: '__images/',
          src: ['**/*.anim.svg'],
          dest: 'images/'
        }]
      },
      replaced: {
        files: [{
          expand: true,
          cwd: '_gen/replaced',
          src: ['**/*.html'],
          dest: ''
        }]
      },
      optimisedImages: {
        files: [{
          expand: true,
          cwd: '__images-optimised/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images'
        }]
      }
    },
    includereplace: {
      dist: {
        options: {
          prefix: '<!--@@',
          suffix: '-->',
          includesDir: '_gen/includereplace/'
        },
        src: '_layouts/default.html',
        dest: '_gen/replaced/'
      }
    },
    pagespeed: {
      indexdesktop: {
        options: {
          url: "http://tyriar.github.io",
          locale: "en_AU",
          strategy: "desktop",
          threshold: 89
        }
      },
      indexmobile: {
        options: {
          url: "http://tyriar.github.io",
          locale: "en_AU",
          strategy: "mobile",
          threshold: 87
        }
      },
      options: {
        key: "AIzaSyDBidp8nubvoE4oW2lbUcaBGK0Mdjueq00",
        url: "http://www.growingwiththeweb.com"
      }
    }
  });

  var tasks = [
    'grunt-contrib-copy',
    'grunt-contrib-htmlmin',
    'grunt-contrib-imagemin',
    'grunt-contrib-sass',
    'grunt-contrib-uglify',
    'grunt-include-replace',
    'grunt-pagespeed',
    'grunt-svgmin'
  ];

  for (var i = 0; i < tasks.length; i++) {
    grunt.loadNpmTasks(tasks[i]);
  }

  grunt.registerTask('gen', [
    'sass',
    'uglify',
    'copy:layouts',
    'htmlmin',
    'includereplace', // Apply any <!--@@include()-->
    'copy:replaced',  // Copy generated files from above into correct folders
    'copy:optimisedImages',
    'imagemin',
    'svgmin',
    'copy:animsvg'
  ]);

  grunt.registerTask('ps', [
    'pagespeed:indexdesktop',
    'pagespeed:indexmobile'
  ]);

  grunt.registerTask('default', [
    'gen',
    'ps'
  ]);
};
