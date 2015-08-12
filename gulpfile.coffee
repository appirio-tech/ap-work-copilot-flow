configs =
  __dirname : __dirname

configs.templateCache = []
configs.templateCache.push
  files : [
    '.tmp/views/*.html'
  ]
  root  : 'views/'
  module: 'ap-copilot-flow'

configs.templateCache.push
  fileName: 'example-templates.js'
  files : [
    '.tmp/views/*.html'
  ]
  root  : 'views/'
  module: 'example'


configs.ngConstants =
  constants:
    apiUrl                  : 'https://api.topcoder-dev.com/v3/' # slash is grandfathered in, need to remove
    API_URL                 : 'https://api.topcoder-dev.com/v3'
    API_URL_V2              : 'https://api.topcoder.com/v2'
    AVATAR_URL              : 'http://www.topcoder.com'
    SUBMISSION_URL          : 'https://studio.topcoder.com'
    AUTH0_CLIENT_ID         : 'abc123'
    AUTH0_DOMAIN            : 'topcoder.topcoder-dev.com'
    AUTH0_TOKEN_NAME        : 'userJWTToken'
    AUTH0_REFRESH_TOKEN_NAME: 'userRefreshJWTToken'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs