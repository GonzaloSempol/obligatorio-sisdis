require("dotenv").config()
const fs = require('fs')
module.exports = {
    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASS: process.env.ADMIN_PASS,
    RSA_PUBLIC_PASS: fs.readFileSync('keys/public.pem', 'utf-8')
}