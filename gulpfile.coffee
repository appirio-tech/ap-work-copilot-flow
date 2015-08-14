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

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs