const rs = require("./../commons/responses");
const utils = require("./../commons/utils");
const _ = require("lodash");
let pv = require("./../commons/passwordVerification");
let s3 = require('./../commons/s3');

// let notificationService = require('./notificationservice').service;
// notificationService.create(_session,{
//     userId : "", // the one who is following
//     notification : "<NAME> has answered a question you are following.",
//     question : {
//         question : "",
//         questionId : "",
//         userId : "", // the one who has created the question
//         firstName : "",// question creators firstName
//         lastName : ""// question creators lastName
//     }
// })

let service = {
    create: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                let userModel = require('./../models/usermodel');
                let notificationModel = require('./../models/notificationmodel');
                if (!body.userId || !body.notification) {
                    return reject(rs.invalidrequest);
                }
                body.notificationId = body.notificationId || utils.getUniqueId();
                body.read = false;
                userModel.findOne({
                    userId: body.userId
                }).then((dbObj) => {
                    if (!!dbObj) {
                        return notificationModel.create(body)
                    } else {
                        reject(rs.notfound);
                    }
                    return;
                }).then(resolve).catch((errors) => {
                    reject(errors);
                    return;
                })
            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    },
    readMany: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let userId = _session.userId || null;
                let query = args[1] || {};
                let userModel = require('./../models/usermodel');
                let notificationModel = require('./../models/notificationmodel');
                let body = {};
                body.userId = userId || null;
                userModel.findOne(body).select(select).then((dbObj) => {
                    if (!!dbObj) {
                        return notificationModel.find({
                            userId: userId
                        }).sort({
                            crreatedAt: -1
                        })
                    } else {
                        reject(rs.notfound);
                    }
                    return;
                }).then(resolve).catch((errors) => {
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
    readMany: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Notifications Read Successfully",
                    code: "READ"
                }],
                notifications: data
            })
        };
        service.readMany(req.user, req.query).then(successCB, next);
    },
};
module.exports.service = service;
module.exports.router = router;