const fs = require('fs-extra')

try {
    fs.copySync('scripts/now/api', 'api')
    console.log('Moved api to prod location.')
}
catch(err) {
    console.log(err)
}