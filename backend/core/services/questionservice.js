var ObjectID = require('mongodb').ObjectID;

const rs = require("./../commons/responses");
const utils = require("./../commons/utils");

let questionModel = require("../models/questionmodel")
let answerModel = require("../models/answermodel")
let userModel = require("../models/usermodel")
let answerUpvotesModel = require("../models/answerupvotesmodel")
let answerDownvotesModel = require("../models/answerdownvotesmodel")
let answerBookmarkModel = require("../models/answerbookmarkmodel")

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

                questionModel.findOne(body).then((questionObj) => {
                    if (!!questionObj){
                        output['userId'] = _session.userId
                        output['id'] = questionObj.questionId
                        output['questionText'] = questionObj.questionText
                        output['followersCount'] = questionObj.followers
                        output['questionerId'] = questionObj.userId
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
                                            if (answererObj !== null){
                                                temp_answer['profileCredential'] = answererObj.profileCredential
                                            }
                                        })
                                        //comments
                                        temp_answer['comments'] = []
                                        answer_output.push(temp_answer)
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
                                //delete 
                                // let temp_answer = {}
                                // temp_answer['id'] = '123456'
                                // temp_answer['answerText'] = "was born into a noble Orthodox Christian Circassian family and grew up in Isfahan in the Iranian royal court. In 1608 she married the Elizabethan English adventurer Robert Shirley, who attended the Safavid court in an effort to forge an alliance against the neighbouring Ottoman Empire. She accompanied him on the Persian embassy to Europe (1609–15), where he represented the Safavid king"
                                // temp_answer['answererId'] = _session.userId
                                // temp_answer['profileCredential'] = "Tanaji Jadhav, SJSU"
                                // temp_answer['isAnonymous'] = false
                                // temp_answer['createdAt'] = new Date()
                                // temp_answer['upvotes'] = 0
                                // temp_answer['downvotes'] = 0
                                // temp_answer['userUpvoted'] = false
                                // temp_answer['userDownvoted'] = false
                                // temp_answer['userBookmarked'] = false
                                // output['answers'].push(temp_answer)
                                // output['answers'].push(temp_answer)
                                //delete
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
        service.update(req.user, req.params.userId, req.body).then(successCB, next);
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
        service.delete(req.user, req.params.userId, req.body).then(successCB, next);
    }
};
module.exports.service = service;
module.exports.router = router;