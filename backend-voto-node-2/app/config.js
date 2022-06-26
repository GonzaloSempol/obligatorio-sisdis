require("dotenv").config()
const fs = require('fs')
module.exports = {
    RSA_PRIVATE_PASS: fs.readFileSync('keys/private.pem', 'utf-8')
}