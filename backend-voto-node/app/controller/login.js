const { authGet } = require('../db/redisAuthUserClient');

class LoginController {
  static async verifyUser(user) {
    return authGet(user);
  }
}

module.exports = { LoginController };
