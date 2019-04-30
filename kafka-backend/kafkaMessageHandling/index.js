var rs = require('./../commons/responses');
var log = require('./../commons/logger');
module.exports = (topic, type, requestId, payload, callback) => {
    let throwError = (err) => {
        callback(null, {
            result: 'failure',
            response: err || [rs.kafkaerror]
        });
    }
    let successCB = (kafkaResponse) => {
        log.info("Step 4 : Event successfully Processed in Mesasge Handler")
        callback(null, kafkaResponse);
    }
    if (!topic || !type || !requestId || !payload) {
        throwError();
        return;
    }
    topic = topic.split("-")[1];
    switch (topic) {
        case 'auth':
            let authHandling = require('./authHandling');
            authHandling(type, payload).then(successCB, throwError);
            break;
        case 'users':
            let userHandling = require('./userHandling');
            userHandling(type, payload).then(successCB, throwError);
            break;
        case 'courses':
            let courseHandling = require('./courseHandling');
            courseHandling(type, payload).then(successCB, throwError);
            break;
        case 'inbox':
            let inboxHandling = require('./inboxHandling');
            inboxHandling(type, payload).then(successCB, throwError);
            break;
        default:
            throwError();
            return;
    }
}