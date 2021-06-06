let user =  require('../models/users');
let Promise = require('promise');
let userManager = new user();

exports.findById = async (req, res) => {

  let userData = await userManager.findById(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(userData);
};

exports.login = async (req, res) => {

  let userData = await userManager.login(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.set({'Access-Token' : userData.token});
  res.json(userData);
};

exports.create = async (req, res) => {

  let userData = await userManager.create(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.set({'Access-Token' : userData.token});
  res.json(userData.userData);
};

exports.update = async (req,res) => {

  let userData = await userManager.update(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(userData);
};


exports.delete = async (req,res) => {

  let userData = await userManager.delete(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(userData);
};


exports.userImageUpload = async (req,res) => {

  let userData = await userManager.userImageUpload(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(userData);
}
