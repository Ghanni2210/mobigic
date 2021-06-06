const userModel = require('./index');
const authManager = require('./../../auth/auth');
const errorModel = require(ROOT_DIR + '/lib/error');
const errorObj = new errorModel();

class UsersManager {

  constructor() {

  }

  async findById() {
    return new Promise(async (resolve, reject) => {
      try {


      } catch (err) {
        let errResp = await errorObj.errorHander('', err);
        reject(errResp);
      }
    });
  }


  async create(reqObj) {

    return new Promise(async (resolve, reject) => {
      try {

        let data = reqObj.body;

        let user = new userModel(data);

        user.username = data.username;
        
        user.password = data.password;
        let userData = await user.save();

        let token = authManager.generateToken(userData, {});

        resolve({ userData, token })
      } catch (err) {
        let errResp = await errorObj.errorHander('', err);
        reject(errResp);
      }
    });
  }

  async login(reqObj) {

    return new Promise(async (resolve, reject) => {
      try {

        let user = reqObj.body;
        let userData = await userModel.findOne({ username: user.username, password:user.password });
        let token  =  authManager.generateToken(userData, {});
        resolve({ userData,token })
      } catch (err) {
        let errResp = await errorObj.errorHander('', err);
        reject(errResp);
      }
    });
  }

  async userImageUpload() {

    return new Promise(async (resolve, reject) => {
      try {

      } catch (err) {
        let errResp = await errorObj.errorHander('', err);
        reject(errResp);
      }
    });
  }
}

module.exports = UsersManager
