let authService = require('./../services/authservice').service;
let userService = require('./../services/userservice').service;
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
                            message: "User Signed In Successfully",
                            code: "SIGNIN"
                        }],
                        user: data,
                        token: jwt.generate({
                            userId: data.userId,
                        })
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
                            message: "User Signed Up Successfully",
                            code: "SIGNUP"
                        }]
                    })
                };
                authService.signup({}, payload.body).then(successCB, throwError);
                break;
            case 'get_user':
                log.info("Step 3 : Event being Processed in Mesasge Handler")
                var successCB = (data) => {
                    resolve({
                        result: "success",
                        response: {
                            message: "User Read Successfully",
                            code: "READ"
                        },
                        user: data
                    })
                };
                userService.read(payload.session, payload.params.userId, payload.query).then(successCB, throwError);
                break;
            case 'create_user':
                log.info("Step 3 : Event being Processed in Mesasge Handler")
                var successCB = (data) => {
                    resolve({
                        result: "success",
                        response: {
                            message: "User Created",
                            code: "USER"
                        }
                    })
                };
                userService.create(payload.session, payload.body, payload.query).then(successCB, throwError);
                break;
            case 'update_user':
                log.info("Step 3 : Event being Processed in Mesasge Handler")
                var successCB = (data) => {
                    resolve({
                        result: "success",
                        response: {
                            message: "User Updated Successfully",
                            code: "UPDATED"
                        }
                    })
                };
                userService.update(payload.session, payload.params.userId, payload.body).then(successCB, throwError);
                break;
            case 'delete_user':
                log.info("Step 3 : Event being Processed in Mesasge Handler")
                var successCB = (data) => {
                    resolve({
                        result: "success",
                        response: {
                            message: "User Deleted",
                            code: "USER"
                        }
                    })
                };
                userService.delete(payload.session, payload.params.userId, payload.body).then(successCB, throwError);
                break;
            default:
                throwError();
                return;
        }
    })

}