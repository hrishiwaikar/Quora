let authService = require('./../services/authService').service;
let log = require('./../commons/logger')
let jwt = require("./../commons/jwt");
let rs = require('./../commons/responses');
module.exports = (type, payload) => {
    return new Promise((resolve, reject) => {
        let throwError = (err) => {
            reject(err || [rs.kafkaerror]);
        }
        switch (type) {
            case 'signin':
                log.info("Step 3 : Event being Processed in Mesasge Handler")
                var successCB = (data) => {
                    resolve({
                        result: "success",
                        response: [{
                            message: "Sign In Successful",
                            code: "USER"
                        }],
                        user: data,
                        token: jwt.generate({
                            userId: data.userId,
                            userType: data.userType,
                        }),
                        expiresIn: (30 * 24 * 60 * 60)
                    })
                };
                authService.signin({}, payload.body, payload.query).then(successCB, throwError);
                break;
            case 'signup':
                log.info("Step 3 : Event being Processed in Mesasge Handler")
                var successCB = (data) => {
                    resolve({
                        result: "success",
                        response: [{
                            message: "Sign Up Successful",
                            code: "USER"
                        }],
                        user: data,
                        token: jwt.generate({
                            userId: data.userId,
                            userType: data.userType,
                        })
                    })
                };
                authService.signup({}, payload.body, payload.query).then(successCB, throwError);
                break;
            default:
                throwError();
                return;
        }
    })

}