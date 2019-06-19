let fs = require('fs')
let mode = process.argv[2]
let projectName = process.argv[3]

if (!projectName) {
  throw '打包项目名称不能为空：npm run build projectName'
}

fs.readFile('./config/projectConfig.json', function(err, data) {
  if (err) {
    console.log('err1')
    console.error(err)
  }
  data = JSON.parse(data.toString())

  data.name = projectName
  data.srcPath = './src/' + projectName + '/'
  data.distPath = '../deploy/' + projectName + '/'

  if (mode == 'yufa') {
    data.publicPath = '/'
  } else {
    data.publicPath = '//www.bootcdn.cn/'
  }

  fs.writeFile('./config/projectConfig.json', JSON.stringify(data), function(err) {
    if (err) {
      console.log('err2')
      console.error(err)
    }

    let exec = require('child_process').execSync
    exec(
      'webpack --config config/webpack.prod.conf.js --progress true --env.mode=production',
      { stdio: 'inherit' }
    )
  })
})
