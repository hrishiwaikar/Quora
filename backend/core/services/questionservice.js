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

let answerCommonAttributes = (_session,answerObj) => {
    return new Promise(async function (resolve, reject) {
        let temp_answer = {}
        temp_answer['answerId'] = answerObj.answerId
        temp_answer['answerText'] = answerObj.answerText
        temp_answer['answererId'] = answerObj.userId
        temp_answer['isAnonymous'] = answerObj.isAnonymous
        temp_answer['createdAt'] = answerObj.createdAt
        temp_answer['upvotes'] = answerObj.upvotes
        temp_answer['downvotes'] = answerObj.downvotes
        temp_answer['noOfTimesViewed'] = answerObj.noOfTimesviewed
        temp_answer['profileCredential'] = null
        temp_answer['userUpvoted'] = false
        temp_answer['userDownvoted'] = false
        temp_answer['userBookmarked'] = false
        temp_answer['userisfollowinganswerer'] = false //vinit dependency
        await answerUpvotesModel.findOne({userId:_session.userId,answerId:answerObj.answerId}).then((answerUpvoteObj)=>{
            if(answerUpvoteObj !== null){
                temp_answer['userUpvoted'] = true
            }
        });
        await answerDownvotesModel.findOne({userId:_session.userId,answerId:answerObj.answerId}).then((answerDownvoteObj)=>{
            if(answerDownvoteObj !== null){
                temp_answer['userDownvoted'] = true
            }
        });
        await answerBookmarkModel.findOne({userId:_session.userId,answerId:answerObj.answerId}).then((answerBookmarkObj)=>{
            if(answerBookmarkObj !== null){
                temp_answer['userBookmarked'] = true
            }
        });
        await userModel.findOne({userId:answerObj.userId}).then((answererObj)=>{
            // console.log("answerObj\n",answererObj)
            if (answererObj !== null){
                temp_answer['profileCredential'] = answererObj.profileCredential
            }
        })
        //comments I have to do
        temp_answer['comments'] = []
        return resolve(temp_answer)
    });
}

let answersPerQuestion = async (_session,questionId,single=false) => {
    return new Promise(function (resolve, reject) {
        let answer_output = []
        answerModel.find({questionId:questionId}).sort('-createdAt').then(async (answerObjs) =>{
            if(answerObjs.length > 0){  
                let answerObjLength = answerObjs.length;    
                if(single){
                    answerObjLength = 1; // to handle single answer and question for UserFeed API
                }          
                for(let index=0;index<answerObjLength;index++){
                    let temp_answer = await answerCommonAttributes(_session,answerObjs[index])
                    answer_output.push(temp_answer)
                    answerObjs[index].noOfTimesviewed += 1;
                    await answerObjs[index].save();
                }
                resolve(answer_output);
            }   
            else{
                resolve(answer_output);
            }
        }).catch((errors) => {
            return reject(errors);
        })
    })
}

let service = {
    create: (...args) => {
        return new Promise(async function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};
                let question_body = {}
                let questionText = body.questionText || "";
                let topics = body.topanswerBookmarkModelics || [];
                let questionObj = new questionModel({userId:_session.userId,questionText:questionText,topicsId:topics});
                questionObj.save().then(response => {
                    // console.log(response.questionId)
                    return resolve(response.questionId);
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
                // console.log("----body----",body);

                questionModel.findOne(body).then(async (questionObj) => {
                    if (!!questionObj){
                        output['userId'] = _session.userId
                        output['questionId'] = questionObj.questionId
                        output['questionText'] = questionObj.questionText
                        output['followersCount'] = questionObj.followers
                        output['questionerId'] = questionObj.userId
                        output['topics'] = []
                        output['userIsFollowingTheQuestion'] = false
                        output['profileCredential'] = "Hrishi, SJSU" //CODE THIS
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

                        //checking if user has awered the question
                        await answerModel.findOne({questionId:questionId,userId:_session.userId}).then(async (answerObj)=>{
                            output['userHasAnswered'] = true
                            if (answerObj === null){
                                output['userHasAnswered'] = false
                            }
                        }).catch((errors) => {
                            console.error(errors)
                            return reject(errors);
                        })
                        output['answers'] = await answersPerQuestion(_session,questionId)
                        return resolve(output);
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
    userFeedList : (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let output = []
                let _session = args[0] || {};
                let page_number = args[1] || 1;
                /* pagination logic */
                // let page_number = param('page')
                // if(page_number === undefined){
                //     page_number = 1
                // }
                let page_limit = 20
                let pagination_end_index = page_number * page_limit
                let pagination_start_index = pagination_end_index - page_limit
                /* pagination logic */

                questionModel.find({}).skip(pagination_start_index).limit(page_limit)
                .then(async (questionObjs) => {
                    for(let index=0;index<questionObjs.length;index++){
                        let answerObj = await answersPerQuestion(_session,questionObjs[index].questionId,true)
                        if(answerObj.length > 0){
                            let temp = {}
                            temp["questionId"] = questionObjs[index].questionId
                            temp["questionText"] = questionObjs[index].questionText
                            await answerModel.findOne({questionId:questionObjs[index].questionId,userId:_session.userId}).then(async (answerObj)=>{
                                temp['userHasAnswered'] = true
                                if (answerObj === null){
                                    temp['userHasAnswered'] = false
                                }
                            }).catch((errors) => {
                                console.error(errors)
                                return reject(errors);
                            })
                            let answer = answerObj[0];
                            temp = Object.assign(temp,answer)
                            output.push(temp)
                        }
                    }
                    return resolve(output)
                }).catch(reject);
            }catch (e) {
                console.error(e)
                return reject(e);
            }
        })
    },
    userQuestionList : (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let output = []
                let _session = args[0] || {};
                let page_number = args[1] || 1;
                questionModel.find({userId:_session.userId}).select({_id:0,"__v":0,topicsId:0,})
                .then(async (questionObjs) => {
                    output["noOfQuestions"] = questionObjs.length;
                    for(let index=0;index<questionObjs.length;index++){
                        let questionObj = questionObjs[index]
                        console.log(questionObj)
                        let temp = {}
                        temp["questionText"] = questionObj.questionText
                        temp['userIsFollowingTheQuestion'] = false
                        temp["createdAt"] = questionObj.createdAt
                        temp["updatedAt"] = questionObj.updatedAt
                        temp["followers"] = questionObj.followers
                        await questionFollowModel.findOne({userId:_session.userId,questionId:questionObj.questionId}).then((questionFollowObj) => {
                            if(questionFollowObj !== null){
                                temp['userIsFollowingTheQuestion'] = true
                            }
                        })
                        temp["noOfAnswers"] = 0
                        await answerModel.find({questionId:questionObj.questionId}).then((response) => {
                            temp["noOfAnswers"] = response.length
                        })
                        output.push(temp)
                    }
                    return resolve(output)
                }).catch(reject);
            }
            catch (e) {
                console.error(e)
                return reject(e);
            }
        });
    },
    userAnswerList : (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let output = []
                let _session = args[0] || {};
                let page_number = args[1] || 1;
                answerModel.find({userId:_session.userId})
                .then(async (answerObjs) => {
                    for(let index=0;index<answerObjs.length;index++){
                        let temp = await answerCommonAttributes(_session,answerObjs[index])
                        await questionModel.findOne({questionId:answerObjs[index].questionId})
                        .then((questionObj) => {
                            temp["questionId"] = questionObj.questionId
                            temp["questionText"] = questionObj.questionText
                        }).catch(reject);
                        output.push(temp)
                    }
                    return resolve(output)
                }).catch(reject);
            }
            catch (e) {
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
                }],
                data: data
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
    userFeedList : (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Question and its single answer listing for user feeds",
                    code: "READ"
                }],
                data: data
            })
        };
        service.userFeedList(req.user,req.param('page')).then(successCB, next);
    },
    userQuestionList : (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "List of user asked questions",
                    code: "READ"
                }],
                data: data
            })
        };
        service.userQuestionList(req.user,req.body).then(successCB, next);
    },
    userAnswerList : (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "List of user answered answers",
                    code: "READ"
                }],
                data: data
            })
        };
        service.userAnswerList(req.user,req.body).then(successCB, next);
    },
};
module.exports.service = service;
module.exports.router = router;