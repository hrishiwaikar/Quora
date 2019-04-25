const rs = require("./../commons/responses");
const utils = require("./../commons/utils");
const _ = require("lodash");
let pv = require("./../commons/passwordVerification");
let service = {
    create: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                let userModel = require('./../models/usermodel');
                body.userId = body.userId || utils.getUniqueId();
                if (!body.password) {
                    throw rs.invalidrequest;
                }
                pv.create(body.password).then((hashedPassword) => {
                    body.password = hashedPassword;
                    userModel.find({
                        email: body.email
                    }).then((response) => {
                        if (!!response && !!response.length) {
                            reject({
                                message: "User Exists",
                                code: "USEREXISTS"
                            });
                        } else {
                            userModel.create(body).then(resolve, reject);
                        }
                    }).catch(reject);
                }).catch(reject);
            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    },
    read: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let userId = args[1] || null;
                let userModel = require('./../models/usermodel');
                let body = {};
                body.userId = userId || null;
                userModel.findOne(body).select({
                    "password": 0,
                    "__v": 0,
                    "_id": 0
                }).then((dbObj) => {
                    if (!!dbObj) {
                        resolve(dbObj);
                    } else {
                        reject(rs.notfound);
                    }
                    return;
                }).catch((errors) => {
                    reject(errors);
                    return;
                })
            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    },
    update: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let userId = args[1] || null;
                let updateObj = args[2] || {};
                let userModel = require('./../models/usermodel');
                let body = {};
                body.userId = userId || null;
                userModel.findOneAndUpdate(body, updateObj, {
                    new: true,
                    runValidators: true
                }).select({
                    "password": 0,
                    "__v": 0,
                    "_id": 0
                }).then((dbObj) => {
                    if(!!dbObj){
                        resolve(dbObj);
                    }else{
                        reject(rs.notfound);
                    }
                    return;
                }).catch((errors) => {
                    reject(errors);
                    return;
                })
            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    },
    delete: (...args) => {
        return new Promise(function(resolve, reject) {
            try {
                let _session = args[0] || {};
                let userId = args[1] || null;
                let userModel = require('./../models/usermodel');
                let body = {};
                body.userId = userId || null;
                userModel.remove(body).then((dbObj) => {
                    if(!!dbObj.deletedCount){
                        resolve({});
                    }else{
                        reject(rs.notfound);
                    }
                    return;
                }).catch((errors) => {
                    reject(errors);
                    return;
                })
            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    }
}
let router = {
    create: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "User Created Successfully",
                    code: "CREATED"
                }]
            })
        };
        service.create(req.user, req.body).then(successCB, next);
    },
    read: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "User Read Successfully",
                    code: "READ"
                }],
                user: data
            })
        };
        service.read(req.user, req.params.userId).then(successCB, next);
    },
    update: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "User Updated Successfully",
                    code: "UPDATED"
                }]
            })
        };
        service.update(req.user, req.params.userId, req.body).then(successCB, next);
    },
    delete: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "User deleted Successfully",
                    code: "Deleted"
                }]
            })
        };
        service.delete(req.user, req.params.userId, req.body).then(successCB, next);
    }
};
module.exports.service = service;
module.exports.router = router;