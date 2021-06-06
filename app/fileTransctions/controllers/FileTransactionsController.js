let files = require('../models/FileTransactions');
let Promise = require('promise');
let filesmanager = new files();

exports.uploadFile = async (req, res) => {

  let filesData = await filesmanager.uploadFile(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });

  res.json(filesData);
};

exports.getFileDownloadURL = async (req, res) => {

  let filesData = await filesmanager.getFileDownloadURL(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });

  res.json(filesData);
};

exports.getFiles = async (req, res) => {

  let filesData = await filesmanager.getFiles(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(filesData);
};

exports.removeFile = async (req, res) => {

  let filesData = await filesmanager.removeFile(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(filesData);
};

exports.downloadFile = async (req, res) => {

  let filesData = await filesmanager.downloadFile(req).catch(err => {
    res.status(err.respHeadersStatus).json(err.respParams);
  });
  res.json(filesData);
};

