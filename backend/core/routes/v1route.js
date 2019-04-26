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
    versionRouter.get('/users/:userId/image', userservice.readProfileImage);
    versionRouter.get('/users/:userId', userservice.read);
    versionRouter.put('/users/:userId', userservice.update);
    versionRouter.delete('/users/:userId', userservice.delete);
    /* User Routes */

    /* Follow Routes */
    versionRouter.post('/follow/:userId', followservice.markFollow); // only self can
    versionRouter.post('/unfollow/:userId', followservice.markUnfollow); // only self can
    versionRouter.get('/users/:userId/followers', followservice.getFollowers);
    versionRouter.get('/users/:userId/following', followservice.getFollowing);
    /* Follow Routes */

    return versionRouter;
}