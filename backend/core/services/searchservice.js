const rs = require("./../commons/responses");
const utils = require("./../commons/utils");

let service = {
    search: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let body = args[1] || {};

                resolve([])
            } catch (e) {
                console.error(e)
                reject(e);
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