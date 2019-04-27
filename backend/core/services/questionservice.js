const rs = require("./../commons/responses");
const utils = require("./../commons/utils");

let questionModel = require("../models/questionmodel")
let answerModel = require("../models/answermodel")

let service = {
    create: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let user = args[0] || {};
                let body = args[1] || {};
                let questionText = body.questionText || "";
                let topics = body.topics || [];
                let questionObj = new questionModel({owner:user.id,questionText:questionText});
                questionObj.topics.push(topics);
                questionObj.save().then(response => {
                    return resolve(response);
                }).catch(reject);
                
            } catch (e) {
                console.error(e)
                reject(e);
                return
            }
        });
    },
    read: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let output = {}
                let answer = []
                let user = args[0] || {};
                let questionId = args[1] || null;
                let body = {};
                body.id = questionId;
                questionModel.findOne(body).then((questionObj) => {
                    if (!!questionObj){
                        output['id'] = questionObj.id
                        output['questionText'] = questionObj.questionText
                        output['followersCount'] = questionObj.followers.length
                        answerModel.find({question:questionId}).sort('-createdAt').populate('owner',firstName,lastName).then((answerObjs) =>{
                            if(answerObjs){
                                answerModel.findOne({question:questionId,owner:user.id}).then(async (answerObj)=>{
                                    output['userHasAnswered'] = true
                                    if (answerObj === null){
                                        output['userHasAnswered'] = false
                                    }
                                    let answer_output = []
                                    for(let index=0;index<answerObjs.length;index++){
                                        let temp_answer = {}
                                        temp_answer['id'] = answerObjs[index].id
                                        temp_answer['answererProfileImage'] = null
                                        temp_answer['profileCredential'] = firstName+ " " +  lastName
                                        temp_answer['isAnonymous'] = answerObjs[index].isAnonymous
                                        temp_answer['createdAt'] = answerObjs[index].createdAt
                                        temp_answer['upvotes'] = answerObjs[index].upvotes.length
                                        temp_answer['downvotes'] = answerObjs[index].downvotes.length
                                        temp['userUpvoted'] = false
                                        temp['userDownvoted'] = false
                                        temp['userBookmarked'] = false
                                        temp['userUpvoted'] = await answerObjs[index].upvotes.some(function (upvotedUserId) {
                                            return upvotedUserId.equals(user.id);
                                        });
                                        temp['userDownvoted'] = await answerObjs[index].downvotes.some(function (downvotedUserId) {
                                            return downvotedUserId.equals(user.id);
                                        });
                                        temp['userBookmarked'] = await answerObjs[index].bookmarkedBy.some(function (bookmarkedUser) {
                                            return bookmarkedUser.equals(user.id);
                                        });
                                        //comments
                                        temp['comments'] = []
                                        answer_output.push(temp_answer)
                                    }
                                    output['answer'] = answer_output
                                    return resolve(output);
                                }).catch((errors) => {
                                    console.error(errors)
                                    console.log("Error while fetching single answe obj")
                                    output['answer'] = []
                                    output['userHasAnswered'] = false
                                    return resolve(output);
                                })
                            }   
                            else{
                                output['answer'] = []
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
                user: data
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