require("dotenv").config()
module.exports = {
    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASS: process.env.ADMIN_PASS,
    DB_CRYPTO_PASS: process.env.DB_CRYPTO_PASS,
    DB_CRYPTO_PASS_IV: process.env.DB_CRYPTO_PASS_IV
}