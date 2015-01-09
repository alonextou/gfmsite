module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cfg: grunt.file.readJSON('config.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    },

    shipit: {
      options: {
        workspace: '<%= cfg.workspace %>',
        deployTo: '/var/www/glassfindme',
        repositoryUrl: '<%= pkg.repository.url %>',
        ignores: ['.git', 'node_modules'],
        keepReleases: 2
      },
      production: {
        servers: ['<%= cfg.user %>@<%= cfg.deployto %>']
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shipit');

  grunt.registerTask('default', ['sass']);
}