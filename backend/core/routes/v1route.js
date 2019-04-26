let authservice = require('./../services/authservice').router;
let userservice = require('./../services/userservice').router;
let followservice = require('./../services/followservice').router;
let jwt = require('./../commons/jwt');
module.exports = (express) => {
    let versionRouter = express.Router();

    /* Auth Routes */
    versionRouter.post('/signin', authservice.signin);
    versionRouter.post('/signup', authservice.signup);
    /* Auth Routes */

    /* User Routes */
    //versionRouter.post('/users', userservice.create);
    versionRouter.get('/users/:userId', jwt.verifyRequest, userservice.read);
    versionRouter.put('/users/:userId', jwt.verifyRequest, userservice.update);
    versionRouter.delete('/users/:userId', jwt.verifyRequest, userservice.delete);
    /* User Routes */

    /* Follow Routes */
    versionRouter.post('/follow/:userId', jwt.verifyRequest, followservice.markFollow); // only self can
    versionRouter.post('/unfollow/:userId', jwt.verifyRequest, followservice.markUnfollow); // only self can
    versionRouter.get('/users/:userId/followers', jwt.verifyRequest, followservice.getFollowers);
    versionRouter.get('/users/:userId/following', jwt.verifyRequest, followservice.getFollowing);
    /* Follow Routes */

    return versionRouter;
}