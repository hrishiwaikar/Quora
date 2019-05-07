const rs = require("./../commons/responses");
const utils = require("./../commons/utils");
let questionModel = require("../models/questionmodel")
let topicModel = require("../models/topicmodel")
let userModel = require("../models/usermodel")

let service = {
    search: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                
                // let search

                // let output = []
                // let _session = args[0] || {};
                // let body = args[1] || {};
                // let searchTerm = body.searchTerm || null;
                // if (searchTerm === null){
                //     console.error("Nothing in the search term, so sending empty list in response")
                //     return resolve(output)
                // }
                // else{
                //     questionModel.find({questionText:new RegExp(filter_value, "i")}).select({questionId:1,questionText:1})..limit(page_limit)
                // }
                resolve([])
            } catch (e) {
                console.error(e)
                return reject(e);
            }
        });
    }
}
let router = {
    search: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Search Results",
                    code: "SEARCH"
                }]
            })
        };
        service.search(req.user, req.query).then(successCB, next);
    }
};
module.exports.service = service;
module.exports.router = router;