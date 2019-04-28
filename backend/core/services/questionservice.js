var ObjectID = require('mongodb').ObjectID;

const rs = require("./../commons/responses");
const utils = require("./../commons/utils");

let questionModel = require("../models/questionmodel")
let answerModel = require("../models/answermodel")
let userModel = require("../models/usermodel")
let topicModel = require("../models/topicmodel")
let answerUpvotesModel = require("../models/answerupvotesmodel")
let answerDownvotesModel = require("../models/answerdownvotesmodel")
let answerBookmarkModel = require("../models/answerbookmarkmodel")
let questionFollowModel = require("../models/questionfollowmodel")

let service = {
    create: (...args) => {
        return new Promise(async function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                let question_body = {}
                let questionText = body.questionText || "";
                let topics = body.topics || [];
                let questionObj = new questionModel({userId:_session.userId,questionText:questionText,topicsId:topics});
                questionObj.save().then(response => {
                    return resolve(response);
                }).catch(reject);
                
            } catch (e) {
                console.error(e)
                return reject(e);
            }
        });
    },
    read: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let output = {}
                let answer = []
                let _session = args[0] || {};
                let questionId = args[1] || null;
                let body = {};
                // body.questionId = mongoose.Types.ObjectId(questionId);
                body.questionId = questionId;

                questionModel.findOne(body).then(async (questionObj) => {
                    if (!!questionObj){
                        output['userId'] = _session.userId
                        output['id'] = questionObj.questionId
                        output['questionText'] = questionObj.questionText
                        output['followersCount'] = questionObj.followers
                        output['questionerId'] = questionObj.userId
                        output['topics'] = []
                        output['userIsFollowingTheQuestion'] = false
                        if (questionObj.topicsId.length > 0){
                            for (let topicIndex=0;topicIndex<questionObj.topicsId.length;topicIndex++){
                                await topicModel.findOne({topicId:questionObj.topicsId[topicIndex]}).then((topicObj) =>{
                                    output['topics'].push(topicObj.topicText)
                                })
                            }
                        }
                        await questionFollowModel.findOne({userId:_session.userId,questionId:questionObj.questionId}).then((questionFollowObj) => {
                            if(questionFollowObj !== null){
                                output['userIsFollowingTheQuestion'] = true
                            }
                        })
                        answerModel.find({questionId:questionId}).sort('-createdAt').then((answerObjs) =>{
                            if(answerObjs.length > 0){
                                answerModel.findOne({questionId:questionId,userId:_session.userId}).then(async (answerObj)=>{
                                    output['userHasAnswered'] = true
                                    if (answerObj === null){
                                        output['userHasAnswered'] = false
                                    }
                                    let answer_output = []
                                    for(let index=0;index<answerObjs.length;index++){
                                        let temp_answer = {}
                                        temp_answer['id'] = answerObjs[index].answerId
                                        temp_answer['answerText'] = answerObjs[index].answerText
                                        temp_answer['answererId'] = answerObjs[index].userId
                                        temp_answer['isAnonymous'] = answerObjs[index].isAnonymous
                                        temp_answer['createdAt'] = answerObjs[index].createdAt
                                        temp_answer['upvotes'] = answerObjs[index].upvotes
                                        temp_answer['downvotes'] = answerObjs[index].downvotes
                                        temp_answer['profileCredential'] = null
                                        temp_answer['userUpvoted'] = false
                                        temp_answer['userDownvoted'] = false
                                        temp_answer['userBookmarked'] = false
                                        temp_answer['userisfollowinganswerer'] = false //vinit dependency
                                        await answerUpvotesModel.findOne({userId:_session.userId,answerId:answerObjs[index].answerId}).then((answerUpvoteObj)=>{
                                            if(answerUpvoteObj !== null){
                                                temp_answer['userUpvoted'] = true
                                            }
                                        });
                                        await answerDownvotesModel.findOne({userId:_session.userId,answerId:answerObjs[index].answerId}).then((answerDownvoteObj)=>{
                                            if(answerDownvoteObj !== null){
                                                temp_answer['userDownvoted'] = true
                                            }
                                        });
                                        await answerBookmarkModel.findOne({userId:_session.userId,answerId:answerObjs[index].answerId}).then((answerBookmarkObj)=>{
                                            if(answerBookmarkObj !== null){
                                                temp_answer['userBookmarked'] = true
                                            }
                                        });
                                        await userModel.findOne({userId:answerObjs[index].userId}).then((answererObj)=>{
                                            if (answererObj !== null && 'profileCredential' in answerObj){
                                                temp_answer['profileCredential'] = answererObj.profileCredential
                                            }
                                        })
                                        //comments
                                        temp_answer['comments'] = []
                                        answer_output.push(temp_answer)
                                        answerObjs[index].noOfTimesviewed += 1;
                                        await answerObjs[index].save();
                                    }
                                    output['answers'] = answer_output
                                    return resolve(output);
                                }).catch((errors) => {
                                    console.error(errors)
                                    console.log("Error while fetching single answe obj")
                                    output['answers'] = []
                                    output['userHasAnswered'] = false
                                    return resolve(output);
                                })
                            }   
                            else{
                                output['answers'] = []
                                output['userHasAnswered'] = false
                                return resolve(output);
                            }
                        }).catch((errors) => {
                            console.error(errors)
                            return reject(errors);
                        })
                    }
                    else{
                        return reject(rs.notfound);
                    }
                }).catch((errors) => {
                    console.error(errors)
                    return reject(errors);
                })

            } catch (e) {
                console.error(e)
                return reject(e);
            }
        });
    },
    questionFollow : (...args) => {
        console.log("Idar")
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                let isFollow = body.isFollow
                let questionId = body.questionId
                if(isFollow) {
                    questionModel.findOne({questionId:questionId}).then((questionObj) => {
                        let questionFollowObj = new questionFollowModel({userId:_session.userId,questionId:questionId})
                        questionFollowObj.save().then(response => {
                            questionObj.followers += 1
                            questionObj.save().then(response => {
                                return resolve(response);
                            }).catch(reject);
                        }).catch(reject);
                    }).catch(reject);
                }
                else{
                    questionModel.findOne({questionId:questionId}).then((questionObj) => {
                        let questionFollowObj = questionFollowModel.remove({userId:_session.userId,questionId:questionId}).then((response) =>{
                            if(questionObj.followers > 0){
                                questionObj.followers -= 1
                            }
                            questionObj.save().then(response => {
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
                    message: "Question Created Successfully",
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
                    message: "Question Read Successfully",
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
                    message: "Question Updated Successfully",
                    code: "UPDATED"
                }]
            })
        };
        service.update(req.user, req.params.questionId, req.body).then(successCB, next);
    },
    delete: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Question deleted Successfully",
                    code: "Deleted"
                }]
            })
        };
        service.delete(req.user, req.params.questionId, req.body).then(successCB, next);
    },
    questionFollow : (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Question follow or unfollow",
                    code: "UPDATED"
                }]
            })
        };
        service.questionFollow(req.user, req.body).then(successCB, next);
    },
};
module.exports.service = service;
module.exports.router = router;