let jwt = require('./../commons/jwt');
let authservice = require('./../services/authservice').router;
let userservice = require('./../services/userservice').router;
let followservice = require('./../services/followservice').router;
let questionservice = require('../services/questionservice').router;
let conversationservice = require('./../services/conversationservice').router;
let answerservice = require('../services/answerservice').router;
let topicservice = require('../services/topicservice').router;
let analyticService = require('../services/analyticservice');
let producer = require('./../commons/kafkarpc');
let log = require('./../commons/logger');
producer = producer.getInstance();
let kEvent = require('./../commons/kafkaEvent');
let kafkaMiddleware = (type) => {
    let topic = "users";
    return (req, res, next) => {
        const options = {};
        let event = new kEvent(topic, type, req);
        producer.fire(event.getEvent(), (err, kafkaResponse) => {
            if (err) {
                next(err);
                return;
            } else {
                log.info("Step 7 : Event Response Recived");
                req.kafkaResponse = kafkaResponse || {};
                next();
                return;
            }
        })
    }
}
// can make custom If required
let finalService = (req, res, next) => {
    if (!!req.kafkaResponse) {
        log.info("Step 8 : Event Response Given to UI");
        res.json(req.kafkaResponse);
        return
    } else {
        next([rs.UNKNOWN_ERR]);
        return;
    }
}
module.exports = (express) => {
    let versionRouter = express.Router();

    /* Auth Routes */
    versionRouter.post('/signin', kafkaMiddleware('signin'), finalService);
    versionRouter.post('/signup', kafkaMiddleware('signup'), finalService);
    /* Auth Routes */

    /* User Routes */
    //versionRouter.post('/users', kafkaMiddleware('create_user'), finalService);
    versionRouter.get('/users/:userId', kafkaMiddleware('get_user'), finalService);
    versionRouter.get('/users/:userId/image', userservice.readProfileImage);
    versionRouter.put('/users/:userId', kafkaMiddleware('update_user'), finalService);
    versionRouter.delete('/users/:userId', kafkaMiddleware('delete_user'), finalService);
    /* User Routes */

    /* Follow Routes */
    versionRouter.post('/follow/:userId', jwt.verifyRequest, followservice.markFollow); // only self can
    versionRouter.post('/unfollow/:userId', jwt.verifyRequest, followservice.markUnfollow); // only self can
    versionRouter.get('/users/:userId/followers', followservice.getFollowers);
    versionRouter.get('/users/:userId/following', followservice.getFollowing);
    /* Follow Routes */

    /* Question Routes */
    versionRouter.post('/questions', jwt.verifyRequest, questionservice.create);
    versionRouter.get('/questions/:questionId', jwt.verifyRequest, questionservice.read);
    versionRouter.put('/questions/:questionId', jwt.verifyRequest, questionservice.update);
    versionRouter.delete('/questions/:questionId', jwt.verifyRequest, questionservice.delete);
    versionRouter.post('/questions/follow', jwt.verifyRequest, questionservice.questionFollow);
    /* Question Routes */

    /* conversations Routes */
    versionRouter.get('/conversations/sendto', jwt.verifyRequest, conversationservice.searchUsers);
    versionRouter.get('/conversations', jwt.verifyRequest, conversationservice.getConversations);
    versionRouter.get('/conversations/:conversationId', jwt.verifyRequest, conversationservice.getOneConversation); // only self can
    versionRouter.post('/conversations/message', jwt.verifyRequest, conversationservice.sendMessage);
    /* conversations Routes */

    /* Answer Routes */
    versionRouter.post('/answers', jwt.verifyRequest, answerservice.create);
    versionRouter.post('/answers/vote', jwt.verifyRequest, answerservice.upordownvote);
    versionRouter.post('/answers/bookmark', jwt.verifyRequest, answerservice.answerBookmark);
    versionRouter.get('/answers/:questionId', jwt.verifyRequest, answerservice.read);
    versionRouter.put('/answers/:questionId', jwt.verifyRequest, answerservice.update);
    versionRouter.delete('/answers/:questionId', jwt.verifyRequest, answerservice.delete);

    versionRouter.get('/answers', jwt.verifyRequest, analyticService.getAnswers);
    versionRouter.get('/answers/:answerId/:type', jwt.verifyRequest, analyticService.getAnswerStats);
    /* Answer Routes */

    /* Topic Routes */
    versionRouter.post('/topics', jwt.verifyRequest, topicservice.create);
    versionRouter.get('/topics/', jwt.verifyRequest, topicservice.read);
    versionRouter.put('/topics/:questionId', jwt.verifyRequest, topicservice.update);
    versionRouter.delete('/topics/:questionId', jwt.verifyRequest, topicservice.delete);
    /* Topic Routes */

    return versionRouter;
}