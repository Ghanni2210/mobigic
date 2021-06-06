const filesModel = require('./index');
const errorModel = require(ROOT_DIR + '/lib/error');
const errorObj = new errorModel();
const fs = require('fs');


class FilesManager {

  constructor() {

  }

  async uploadFile(reqObj) {

    return new Promise(async (resolve, reject) => {
      try {
        let file = reqObj.files;
        let fileUploader = new filesModel();

        fileUploader.userId = reqObj.userId;
        fileUploader.path = file[0].path;
        fileUploader.code = file[0].path.split("/")[1];
        console.log(fileUploader);
        let res   = await fileUploader.save();

        resolve(res)
      } catch (err) {
        let errResp = await errorObj.errorHander('', err);
        reject(errResp);
      }
    });
  }

  async getFiles(reqObj) {

    return new Promise(async (resolve, reject) => {
      try {
        let data = reqObj.userId;
        console.log(data);
        let files =  await filesModel.find({userId:data});
        resolve(files)
      } catch (err) {
        let errResp = await errorObj.errorHander('', err);
        reject(errResp);
      }
    });
  }


  async getFileDownloadURL(reqObj) {

    return new Promise(async (resolve, reject) => {
      try {
        let data = reqObj.params.code;

        let path = ROOT_DIR + `uploads/${data}`;

        resolve({downloadURL:`http://www.website.com${path}`})
      } catch (err) {
        let errResp = await errorObj.errorHander('', err);
        reject(errResp);
      }
    });
  }

  async removeFile(reqObj) {

    return new Promise(async (resolve, reject) => {
      try {
        let data = reqObj.body;
        let userId = reqObj.userId;
        let code = data.code;
        console.log(userId);
        let path = ROOT_DIR + `uploads/${code}`;
        fs.unlinkSync(path);
        await filesModel.deleteOne({code:code, userId:userId});
        // let files =  aw/
        resolve({data:"File deleted successfully"})
      } catch (err) {
        let errResp = await errorObj.errorHander('', err);
        reject(errResp);
      }
    });
  }

}

module.exports = FilesManager
