"use strict"
module.exports = (grunt) ->
  
  # load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks
  
  # configurable paths
  yeomanConfig =
    app: "app"
    dist: "dist"

  try
    yeomanConfig.app = require("./component.json").appPath or yeomanConfig.app
  grunt.initConfig
    yeoman: yeomanConfig
    watch:
      coffee:
        files: ["<%= yeoman.app %>/scripts/{,*/}*.coffee"]
        tasks: ["coffee:dev"]

      compass:
        files: ["<%= yeoman.app %>/styles/{,*/}*.{scss,sass}"]
        tasks: ["compass:dev"]

    clean:
      dist:
        files: [
          dot: true
          src: [".tmp", "<%= yeoman.dist %>/*", "!<%= yeoman.dist %>/.git*"]
        ]

      server: ".tmp"

    coffee:
      dev:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/scripts"
          src: "{,*/}*.coffee"
          dest: "app/scripts"
          ext: ".js"
        ]

      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/scripts"
          src: "{,*/}*.coffee"
          dest: ".tmp/scripts"
          ext: ".js"
        ]

    compass:
      options:
        require: "bootstrap-sass"
        sassDir: "<%= yeoman.app %>/styles"
        cssDir: ".tmp/styles"
        imagesDir: "<%= yeoman.app %>/images"
        javascriptsDir: "<%= yeoman.app %>/scripts"
        fontsDir: "<%= yeoman.app %>/styles/fonts"
        importPath: "<%= yeoman.app %>/components"
        relativeAssets: true

      dist: 
        options:
          cssDir: "<%= yeoman.app %>/styles"
          debugInfo: false
      dev:
        options:
          cssDir: "<%= yeoman.app %>/styles"
          debugInfo: true

    concat:
      dist:
        files:
          "<%= yeoman.dist %>/scripts/scripts.js": [".tmp/scripts/{,*/}*.js", "<%= yeoman.app %>/scripts/{,*/}*.js"]

    useminPrepare:
      html: "<%= yeoman.app %>/index.html"
      options:
        dest: "<%= yeoman.dist %>"

    usemin:
      html: ["<%= yeoman.dist %>/{,*/}*.html"]
      css: ["<%= yeoman.dist %>/styles/{,*/}*.css"]
      options:
        dirs: ["<%= yeoman.dist %>"]

    imagemin:
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.app %>/images"
          src: "{,*/}*.{png,jpg,jpeg}"
          dest: "<%= yeoman.dist %>/images"
        ]

    cssmin:
      dist:
        files:
          "<%= yeoman.dist %>/styles/main.css": [".tmp/styles/{,*/}*.css", "<%= yeoman.app %>/styles/{,*/}*.css"]

    htmlmin:
      dist:
        options: {}
        
        #removeCommentsFromCDATA: true,
        #          // https://github.com/yeoman/grunt-usemin/issues/44
        #          //collapseWhitespace: true,
        #          collapseBooleanAttributes: true,
        #          removeAttributeQuotes: true,
        #          removeRedundantAttributes: true,
        #          useShortDoctype: true,
        #          removeEmptyAttributes: true,
        #          removeOptionalTags: true
        files: [
          expand: true
          cwd: "<%= yeoman.app %>"
          src: ["*.html", "views/*.html"]
          dest: "<%= yeoman.dist %>"
        ]

    ngmin:
      dist:
        files: [
          expand: true
          cwd: "<%= yeoman.dist %>/scripts"
          src: "*.js"
          dest: "<%= yeoman.dist %>/scripts"
        ]

    uglify:
      dist:
        files:
          "<%= yeoman.dist %>/scripts/scripts.js": ["<%= yeoman.dist %>/scripts/scripts.js"]

    rev:
      dist:
        files:
          src: ["<%= yeoman.dist %>/scripts/{,*/}*.js", "<%= yeoman.dist %>/styles/{,*/}*.css", "<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}", "<%= yeoman.dist %>/styles/fonts/*"]

    copy:
      dist:
        files: [
          expand: true
          dot: true
          cwd: "<%= yeoman.app %>"
          dest: "<%= yeoman.dist %>"
          src: ["*.{ico,txt}", "partials/**/*", "components/es5-shim/", "styles/font/*", "images/{,*/}*.{gif,webp}"]
        ]

  grunt.renameTask "regarde", "watch"
  grunt.registerTask "server", ["clean:server", "coffee:dist", "compass:dev", "watch"]
  grunt.registerTask "build", ["clean:dist", "coffee", "compass:dist", "useminPrepare", "imagemin", "cssmin", "htmlmin", "concat", "copy", "ngmin", "uglify", "rev", "usemin"]
  grunt.registerTask "default", ["build"]