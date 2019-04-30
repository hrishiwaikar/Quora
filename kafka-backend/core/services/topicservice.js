const rs = require("./../commons/responses");
const utils = require("./../commons/utils");
const topicModel = require("../models/topicmodel");

let service = {
    create: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                let topicCreationParams = {}
                topicCreationParams.topicText = body.topicText
                
                let topicObj = new topicModel(topicCreationParams);
                topicObj.save().then(response => {
                    return resolve(response);
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
                let output = [];
                topicModel.find({}).then((topicsObj) => {
                    for (let index = 0;index < topicsObj.length;index++){
                        let temp = {}
                        temp.topicText = topicsObj[index].topicText
                        temp.id = topicsObj[index].topicId
                        output.push(temp)
                    }
                    return resolve(output);
                })
            } catch (e) {
                console.error(e)
                reject(e);
            }
        }); 
    },
    update: (...args) => {
        return new Promise(function (resolve, reject) {
            
        });
    },
    delete: (...args) => {
        return new Promise(function (resolve, reject) {
            
        });
    }
}
let router = {
    create: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Topic Created Successfully",
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
                    message: "Topic Read Successfully",
                    code: "READ"
                }],
                data: data
            })
        };
        service.read(req.user, req.params.topicId).then(successCB, next);
    },
    update: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Topic Updated Successfully",
                    code: "UPDATED"
                }]
            })
        };
        service.update(req.user, req.params.topicId, req.body).then(successCB, next);
    },
    delete: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Topic deleted Successfully",
                    code: "Deleted"
                }]
            })
        };
        service.delete(req.user, req.params.topicId, req.body).then(successCB, next);
    }
};
module.exports.service = service;
module.exports.router = router;