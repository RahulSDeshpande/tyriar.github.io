module.exports = function(grunt) {

  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
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
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.config('htmlmin', {
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
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.config('imagemin', {
    dist: {
      files: [{
        expand: true,
        cwd: '__images',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'images/'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.config('sass', {
    dist: {
      options: {
        style: 'compressed'
      },
      files: {
        'css/styles.css': '__sass/styles.scss',
        '_gen/includereplace/inline.css': '__sass/inline.scss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    dist: {
      files: {
        'scripts/site.js': [
          '__scripts/search.js',
          '__scripts/share.js',
          // TODO: Fix responsive tables
          //'__scripts/responsive-tables.js',
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
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-include-replace');
  grunt.config('includereplace', {
    dist: {
      options: {
        prefix: '<!--@@',
        suffix: '-->',
        includesDir: '_gen/includereplace/'
      },
      src: '_layouts/default.html',
      dest: '_gen/replaced/'
    }
  });

  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.config('pagespeed', {
    indexdesktop: {
      options: {
        url: "http://tyriar.github.io",
        locale: "en_AU",
        strategy: "desktop",
        threshold: 80
      }
    },
    indexmobile: {
      options: {
        url: "http://tyriar.github.io",
        locale: "en_AU",
        strategy: "mobile",
        threshold: 80
      }
    },
    options: {
      key: "AIzaSyDBidp8nubvoE4oW2lbUcaBGK0Mdjueq00",
      url: "http://www.growingwiththeweb.com"
    }
  });

  grunt.loadNpmTasks('grunt-svgmin');
  grunt.config('svgmin', {
    options: {
      plugins: [
        { mergePaths: false },
        { removeTitle: false },
        { removeViewBox: false }
      ]
    },
    dist: {
      files: [{
        expand: true,
        cwd: '__images',
        src: ['**/*.svg'],
        dest: 'images/'
      }]
    }
  });

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
    'gen'
  ]);
};
