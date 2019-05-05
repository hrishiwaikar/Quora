const rs = require("./../commons/responses");
const utils = require("./../commons/utils");
const _ = require("lodash");
let pv = require("./../commons/passwordVerification");
let s3 = require('./../commons/s3');
let service = {
    create: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                let userModel = require('./../models/usermodel');
                body.firstName = (body.firstName || "").toLowerCase();
                body.lastName = (body.lastName || "").toLowerCase();
                body.userId = body.userId || utils.getUniqueId();
                if (!body.password) {
                    throw rs.invalidrequest;
                }
                pv.create(body.password).then((hashedPassword) => {
                    body.password = hashedPassword;
                    userModel.find({
                            email: body.email
                        })
                        .then((response) => {
                            if (!!response && !!response.length) {
                                reject({
                                    message: "User Exists",
                                    code: "USEREXISTS"
                                });
                            } else {
                                return userModel.find({
                                    firstName: body.firstName,
                                    lastName: body.lastName,
                                });
                            }
                        })
                        .then((dbObj) => {
                            let c = 0;
                            body.displayId = body.firstName + "-" + body.lastName;
                            if (!!dbObj && !!dbObj.length) {
                                body.displayId = body.displayId + "-" + dbObj.length;
                            }
                            return userModel.create(body)
                        })
                        .then(resolve, reject)
                        .catch(reject);
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
                let query = args[2] || {};
                let userModel = require('./../models/usermodel');
                let body = {};
                body.userId = userId || null;
                let select = {
                    "password": 0,
                    "__v": 0,
                    "_id": 0
                };
                if (query.filter && !!query.filter.length) {
                    select = {};
                    query.filter = (query.filter || "").split(",");
                    for (let index = 0; index < query.filter.length; index++) {
                        select[query.filter[index]] = 1
                    }
                }
                userModel.findOne(body).select(select).then((dbObj) => {
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
    readProfileImage: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let userId = args[1] || null;
                resolve();
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
                    if (!!dbObj) {
                        let objKeys = Object.keys(updateObj);
                        for (let i = 0; i < objKeys.length; i++) {
                            if (!!dbObj[objKeys[i]]) {
                                updateObj[objKeys[i]] = dbObj[objKeys[i]];
                            }
                        }
                        resolve(updateObj);
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
    uploadImage: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let userId = args[1] || null;
                let file = args[2] || {};
                // let userModel = require('./../models/usermodel');
                // let body = {};
                // body.userId = userId || null;
                // s3.up(process.cwd() + `/uploads/profiles/File_${userId}`, `profiles/${userId}`, {
                //     "ACL": "public-read"
                // }).then((d) => {
                //     console.log(d)
                // }, (e) => {
                //     console.log("err", e)
                // });
                resolve({})
            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    },
    delete: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let userId = args[1] || null;
                let userModel = require('./../models/usermodel');
                let body = {};
                body.userId = userId || null;
                userModel.remove(body).then((dbObj) => {
                    if (!!dbObj.deletedCount) {
                        resolve({});
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
    readProfileImage: (req, res, next) => {
        let successCB = (data) => {
            res.sendFile(process.cwd() + '/profiles/default.png');
        };
        service.readProfileImage(req.user, req.params.userId).then(successCB, next);
    },
    update: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "User Updated Successfully",
                    code: "UPDATED"
                }],
                user: data || {}
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
    },
    uploadImage: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "User Updated Successfully",
                    code: "UPDATED"
                }]
            })
        };
        service.uploadImage(req.user, req.params.userId, req.file).then(successCB, next);
    }
};
module.exports.service = service;
module.exports.router = router;