let jwt = require('./../commons/jwt');
let authservice = require('./../services/authservice').router;
let userservice = require('./../services/userservice').router;
let followservice = require('./../services/followservice').router;
let questionservice = require('../services/questionservice').router;
let conversationservice = require('./../services/conversationservice').router;
let answerservice = require('../services/answerservice').router;

module.exports = (express) => {
    let versionRouter = express.Router();

    /* Auth Routes */
    versionRouter.post('/signin', authservice.signin);
    versionRouter.post('/signup', authservice.signup);
    /* Auth Routes */

    /* User Routes */
    //versionRouter.post('/users', userservice.create);
    versionRouter.get('/users/:userId', userservice.read);
    versionRouter.get('/users/:userId/image', userservice.readProfileImage);
    versionRouter.put('/users/:userId', userservice.update);
    versionRouter.delete('/users/:userId', userservice.delete);
    /* User Routes */

    /* Follow Routes */
    versionRouter.post('/follow/:userId', jwt.verifyRequest, followservice.markFollow); // only self can
    versionRouter.post('/unfollow/:userId', jwt.verifyRequest, followservice.markUnfollow); // only self can
    versionRouter.get('/users/:userId/followers', followservice.getFollowers);
    versionRouter.get('/users/:userId/following', followservice.getFollowing);
    /* Follow Routes */

     /* Question Routes */
     versionRouter.post('/questions',jwt.verifyRequest, questionservice.create);
     versionRouter.get('/questions/:questionId',jwt.verifyRequest, questionservice.read);
     versionRouter.put('/questions/:questionId',jwt.verifyRequest, questionservice.update);
     versionRouter.delete('/questions/:questionId',jwt.verifyRequest, questionservice.delete);
     /* Question Routes */
     
    /* conversations Routes */
    versionRouter.get('/conversations/sendto', jwt.verifyRequest, conversationservice.searchUsers);
    versionRouter.get('/conversations', jwt.verifyRequest, conversationservice.getConversations);
    versionRouter.get('/conversations/:conversationId', jwt.verifyRequest, conversationservice.getOneConversation); // only self can
    versionRouter.post('/conversations/message', jwt.verifyRequest, conversationservice.sendMessage);
    /* conversations Routes */

     /* Answer Routes */
     versionRouter.post('/answers',jwt.verifyRequest, answerservice.create);
     versionRouter.get('/answers/:questionId',jwt.verifyRequest, answerservice.read);
     versionRouter.put('/answers/:questionId',jwt.verifyRequest, answerservice.update);
     versionRouter.delete('/answers/:questionId',jwt.verifyRequest, answerservice.delete);
     /* Answer Routes */

    return versionRouter;
}