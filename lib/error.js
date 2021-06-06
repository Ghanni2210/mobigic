'use strict' ;

class  ErrorHandler {

  validationError(err) {
    let errResp = {
      type : 'ValidationError',
      message : err.message
    };
    return this.badRequestResp(errResp);
  };

  tryCatchError(err) {
    let errResp = {
      type : 'serverError',
      message : err.message,
    }
    return this.serverErrorResp(errResp);
  };

  customError(code,err) {
    let errResp = {
      type : 'customError',
      message : err.message,
    }
    return this.customErrorResp(code,errResp);
  };

  errorHander(code,err) {
    if (code) {
      return this.customError(code,err);
    }
    else if (err.name === 'ValidationError') {
      return this.validationError(err);
    }
    else {
      return this.tryCatchError(err);
    }
  };

  badRequestResp(errData) {
    return {
      respHeadersStatus: 400, 
      respParams: errData
    };
  };

  serverErrorResp(errData) {
    return {
      respHeadersStatus: 500, 
      respParams: errData
    };
  }

  customErrorResp(code,errData) {
    return {
      respHeadersStatus: code, 
      respParams: errData
    };
  };
}

module.exports = ErrorHandler;
