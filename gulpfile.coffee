configs =
  coffeeFiles     : ['app/**/*.coffee', 'example/**/*.coffee']
  jadeFiles       : ['app/**/*.jade', 'example/**/*.jade']
  # scssFiles       : ['app/**/**/*.scss']
  scssIncludePaths: require('appirio-work-styles').includePaths
  tempFolder      : '.tmp'
  appFolder       : 'app'
  exampleFolder   : 'example'
  distFolder      : 'dist'

configs.karma =
  coverage   : 'app/**/*.coffee'
  # Dont include coverage files
  coffeeFiles: [
    'tests/specs/**/*.coffee'
  ]
  files: [
    'bower_components/angular/angular.js'
    'bower_components/angular-mocks/angular-mocks.js'
    'bower_components/angular-resource/angular-resource.js'
    'bower_components/auto-config-fake-server/dist/auto-config-fake-server.js'
    'bower_components/bardjs/dist/bard.js'
    'app/ap-copilot-flow.module.js'
    'app/tests/helper.coffee'
    '.tmp/scripts/constants.js'
    'app/**/scripts/*.module.js'
    '.tmp/scripts/templates.js'
    'app/tests/*.js'
  ]

configs.fixtureFiles = [
]

configs.constants =
  API_URL       : 'https://api.topcoder-dev.com/v3'
  API_URL_V2    : 'https://api.topcoder-dev.com/v2'
  AVATAR_URL    : 'http://www.topcoder.com'
  SUBMISSION_URL: 'https://studio.topcoder.com  '
  AUTH0_CLIENT_ID : 'JFDo7HMkf0q2CkVFHojy3zHWafziprhT'
  AUTH0_DOMAIN    : 'topcoder-dev.auth0.com'
  AUTH0_TOKEN_NAME: 'userJWTToken'

configs.templateCache =
  files : [
    '.tmp/**/views/*.html', '.tmp/**/**/*.html'
  ]
  root  : ''
  module: 'ap-copilot-flow'

configs.coverageReporter =
  type: 'lcov'
  dir: 'coverage'

configs.buildFiles =
  concat:
    'main.js': [
      'app/ap-copilot-flow.module.js'
      'app/projects/scripts/projects.module.js'
      'app/project-details/scripts/project-details.module.js'
      'app/project-details/scripts/project-details.routes.js'
      'app/project-details/scripts/project-details.service.js'
      'app/project-details/scripts/project-details.controller.js'
      'app/project-details/details-features/scripts/challenges.controller.js'
      'app/project-details/scripts/filters/capitalize.filter.js'
      'app/project-details/scripts/filters/cutOff.filter.js'
      'app/project-details/scripts/filters/requestType.filter.js'
      'app/project-details/scripts/filters/status.filter.js'
      'app/project-details/scripts/filters/statusButton.filter.js'
      'app/project-details/scripts/statusModal.directive.js'
      'app/projects/scripts/projects.routes.js'
      'app/projects/scripts/projects.service.js'
      'app/projects/scripts/projectsTab.controller.js'
      'app/projects/scripts/projects.controller.js'
      '.tmp/scripts/templates.js'
    ]
    'main.css': [
      '.tmp/styles/**/*.css'
    ]

##
## Normally, you wouldnt need to edit below this line ##
##

gulpTaskPath             = './node_modules/appirio-gulp-tasks'
configs.karma.configFile = __dirname + '/' + gulpTaskPath + '/karma.conf.coffee'
configs.karma.basePath   = __dirname
pluginsPath              = gulpTaskPath + '/node_modules/gulp-load-plugins'
browserSyncPath          = gulpTaskPath + '/node_modules/browser-sync'
karmaPath                = gulpTaskPath + '/node_modules/karma'

gulpLoadPluginsOptions =
  config: __dirname + '/' + gulpTaskPath + '/package.json'

gulp          = require 'gulp'
plugins       = require pluginsPath
$             = plugins gulpLoadPluginsOptions
$.browserSync = require browserSyncPath
$.karma       = require(karmaPath).server

tasks = [
  'coffee'
  'jade'
  'scss'
  'clean'
  'serve'
  'build'
  'test'
  'ng-constant'
  'coveralls'
  'fixtures'
  'template-cache'
]

for task in tasks
  module = require(gulpTaskPath + '/tasks/' + task)
  module gulp, $, configs

gulp.task 'default', ['clean'], ->
  gulp.start 'build'