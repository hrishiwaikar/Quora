let jwt = require('./../commons/jwt');
let authservice = require('./../services/authservice').router;
let userservice = require('./../services/userservice').router;
let followservice = require('./../services/followservice').router;
let questionservice = require('../services/questionservice').router;
let conversationservice = require('./../services/conversationservice').router;
let answerservice = require('../services/answerservice').router;
let topicservice = require('../services/topicservice').router;
let analyticService = require('../services/analyticservice');
let uploadService = require('../services/uploadService');

// const upload = require('../services/imageservice');

// const singleUpload = upload.single('profileimage');
// versionRouter.put("/users/:userId/image", jwt.verifyRequest, function (req, res) {
//     singleUpload(req, res, function (err) {
//         if (err) {
//             return res.status(422).send({
//                 errors: [{
//                     title: 'Image Upload Error',
//                     detail: err.message
//                 }]
//             });
//         }

//         return res.json({
//             'imageUrl': req.file.location
//         });
//     });
// });
module.exports = (express) => {
    try {
        let versionRouter = express.Router();

        /* Auth Routes */
        versionRouter.post('/signin', authservice.signin);
        versionRouter.post('/signup', authservice.signup);
        /* Auth Routes */

        /* User Routes */
        //versionRouter.post('/users', userservice.create);
        versionRouter.get('/users/:userId', jwt.verifyRequest, userservice.read);

        versionRouter.put("/users/:userId/image", jwt.verifyRequest, uploadService("profileUpload"), userservice.uploadImage);
        versionRouter.get("/users/:userId/image", uploadService('profileRead'));
        versionRouter.put('/users/:userId', jwt.verifyRequest, userservice.update);
        versionRouter.delete('/users/:userId', jwt.verifyRequest, userservice.delete);
        /* User Routes */

        /* Follow Routes */
        versionRouter.post('/follow/:userId', jwt.verifyRequest, followservice.markFollow); // only self can
        versionRouter.post('/unfollow/:userId', jwt.verifyRequest, followservice.markUnfollow); // only self can
        versionRouter.get('/users/:userId/followers', jwt.verifyRequest, followservice.getFollowers);
        versionRouter.get('/users/:userId/following', jwt.verifyRequest, followservice.getFollowing);
        /* Follow Routes */

        /* Question Routes */

        //versionRouter.get('/feed', jwt.verifyRequest, questionservice.create); // one question one answer - most recent & most upvoted

        versionRouter.post('/questions', jwt.verifyRequest, questionservice.create);
        versionRouter.get('/questions/:questionId', jwt.verifyRequest, questionservice.read);
        //versionRouter.put('/questions/:questionId', jwt.verifyRequest, questionservice.update);
        //versionRouter.delete('/questions/:questionId', jwt.verifyRequest, questionservice.delete);
        versionRouter.post('/questions/:questionId/follow', jwt.verifyRequest, questionservice.questionFollow); // NOtify Hrishi
        /* Question Routes */

        /* conversations Routes */
        versionRouter.get('/conversations/sendto', jwt.verifyRequest, conversationservice.searchUsers);
        versionRouter.get('/conversations', jwt.verifyRequest, conversationservice.getConversations);
        versionRouter.get('/conversations/:conversationId', jwt.verifyRequest, conversationservice.getOneConversation); // only self can
        versionRouter.post('/conversations/message', jwt.verifyRequest, conversationservice.sendMessage);
        /* conversations Routes */

        /* Answer Routes */
        versionRouter.post('/answers', jwt.verifyRequest, answerservice.create);
        versionRouter.get('/answers', jwt.verifyRequest, analyticService.getAnswers);
        versionRouter.post('/answers/:answerId/vote', jwt.verifyRequest, answerservice.upordownvote); // notify Hrishi
        versionRouter.post('/answers/:answerId/bookmark', jwt.verifyRequest, answerservice.answerBookmark); // notify Hrishi
        versionRouter.get('/answers/:answerId/:type', jwt.verifyRequest, analyticService.getAnswerStats);
        //versionRouter.get('/answers/:questionId', jwt.verifyRequest, answerservice.read);
        //versionRouter.put('/answers/:questionId', jwt.verifyRequest, answerservice.update);
        //versionRouter.delete('/answers/:questionId', jwt.verifyRequest, answerservice.delete);

        versionRouter.get('/views', analyticService.getViews);
        /* Answer Routes */

        /* Topic Routes */
        versionRouter.post('/topics', jwt.verifyRequest, topicservice.create);
        versionRouter.get('/topics', jwt.verifyRequest, topicservice.readMany);
        versionRouter.put('/topics/:questionId', jwt.verifyRequest, topicservice.update);
        versionRouter.delete('/topics/:questionId', jwt.verifyRequest, topicservice.delete);
        /* Topic Routes */

        return versionRouter;
    } catch (error) {
        console.error(error)
    }

}