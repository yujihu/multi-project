let fs = require('fs')
let projectName = process.argv[2]

fs.readFile('./config/projectConfig.json', function(err, data) {
  if (err) {
    console.error(err)
  }
  data = JSON.parse(data.toString())

  if (projectName && projectName != 'template') {
    data.name = projectName
    data.srcPath = './src/' + projectName + '/'
    data.distPath = '../deploy/' + projectName + '/'
  } else {
    data.name = 'template'
    data.srcPath = './template/'
    data.distPath = '../deploy/template/'
  }
  data.publicPath = '/'

  fs.writeFile('./config/projectConfig.json', JSON.stringify(data), function(
    err
  ) {
    if (err) {
      console.error(err)
    }

    let exec = require('child_process').execSync
    exec(
      'webpack-dev-server --config config/webpack.dev.conf.js --env.mode=development',
      { stdio: 'inherit' }
    )
  })
})
