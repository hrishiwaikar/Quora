var ObjectID = require('mongodb').ObjectID;

const rs = require("./../commons/responses");
const utils = require("./../commons/utils");

let questionModel = require("../models/questionmodel")
let answerModel = require("../models/answermodel")
let topicModel = require("../models/topicmodel")
let userModel = require("../models/usermodel")
let upvoteModel = require("../models/answerupvotesmodel")
let downvoteModel = require("../models/answerdownvotesmodel")
let answerBookmarkModel = require("../models/answerbookmarkmodel")

let service = {
    create: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                let answerCreationParams = {}
                answerCreationParams.userId = _session.userId
                answerCreationParams.questionId = body.questionId
                answerCreationParams.answerText = body.answerText
                answerCreationParams.isAnonymous = body.isAnonymous

                let creationAnswerQuery = new answerModel(answerCreationParams)
                creationAnswerQuery.save().then(response => {
                    return resolve(response);
                }).catch(reject);
            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    },
    upordownvote : (...args) => {
        console.log("Idar")
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                console.log("body",body)
                let isUpvote = body.isUpvote
                let answerId = body.answerId
                if(isUpvote) {
                    answerModel.findOne({answerId:answerId}).then((answerObj) => {
                        downvoteModel.findOne({userId:_session.userId,answerId:answerId}).then(async (downvoteObj) => {
                            if (downvoteObj !== null){
                                await downvoteModel.remove({userId:_session.userId,answerId:answerId}).then(async (response) => {
                                    if(answerObj.downvotes > 0){
                                        answerObj.downvotes -= 1
                                    }
                                    await answerObj.save()
                                })
                            }
                            let upvoteObj = new upvoteModel({userId:_session.userId,answerId:answerId})
                            await upvoteObj.save().then(async (response) => {
                                answerObj.upvotes += 1
                                await answerObj.save().then((response) =>{
                                    return resolve(response);
                                })
                            }).catch(reject);
                        })
                    })
                }
                else{
                    answerModel.findOne({answerId:answerId}).then((answerObj) => {
                        upvoteModel.findOne({userId:_session.userId,answerId:answerId}).then(async (upvoteObj) => {
                            if (upvoteObj !== null){
                                await upvoteModel.remove({userId:_session.userId,answerId:answerId}).then(async (response) => {
                                    if(answerObj.upvotes > 0){
                                        answerObj.upvotes -= 1
                                    }
                                    await answerObj.save()
                                })
                            }
                            let downvoteObj = new upvoteModel({userId:_session.userId,answerId:answerId})
                            await downvoteObj.save().then(async (response) => {
                                answerObj.downvotes += 1
                                await answerObj.save().then((response) =>{
                                    return resolve(response);
                                })
                            }).catch(reject);
                        })
                    })
                }
            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    },
    answerBookmark : (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                let isBookmark = body.isBookmark
                let answerId = body.answerId
                if(isBookmark) {
                    answerModel.findOne({answerId:answerId}).then((answerObj) => {
                        let answerBookmarkObj = new answerBookmarkModel({userId:_session.userId,answerId:answerId})
                        answerBookmarkObj.save().then(response => {
                            answerObj.bookmarkedBy += 1
                            answerObj.save().then(response => {
                                return resolve(response);
                            }).catch(reject);
                        }).catch(reject);
                    }).catch(reject);
                }
                else{
                    answerModel.findOne({answerId:answerId}).then((answerObj) => {
                        let answerBookmarkObj = answerBookmarkModel.remove({userId:_session.userId,answerId:answerId}).then((response) =>{
                            if(answerObj.bookmarkedBy > 0){
                                questionObj.bookmarkedBy -= 1
                            }
                            answerObj.save().then(response => {
                                return resolve(response);
                            }).catch(reject);
                        }).catch(reject);
                    }).catch(reject);
                }
            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    },
    read: (...args) => {
        return new Promise(function (resolve, reject) {
        
        });
    },
    update: (...args) => {
        return new Promise(function (resolve, reject) {
            
        });
    },
    delete: (...args) => {
        return new Promise(function(resolve, reject) {
            
        });
    }
}
let router = {
    create: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Answer Created Successfully",
                    code: "CREATED"
                }]
            })
        };
        service.create(req.user, req.body).then(successCB, next);
    },
    upordownvote : (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Answer upvoted or downvoted",
                    code: "UPDATED"
                }]
            })
        };
        service.upordownvote(req.user, req.body).then(successCB, next);
    },
    answerBookmark : (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Answer bookmarked or unbookmarked",
                    code: "UPDATED"
                }]
            })
        };
        service.answerBookmark(req.user, req.body).then(successCB, next);
    },
    read: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Answer Read Successfully",
                    code: "READ"
                }],
                data: data
            })
        };
        service.read(req.user, req.params.questionId).then(successCB, next);
    },
    update: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Answer Updated Successfully",
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
                    message: "Answer deleted Successfully",
                    code: "Deleted"
                }]
            })
        };
        service.delete(req.user, req.params.userId, req.body).then(successCB, next);
    }
};
module.exports.service = service;
module.exports.router = router;