let authservice = require('./../services/authservice').router;
let userservice = require('./../services/userservice').router;
module.exports = (express) => {
    let versionRouter = express.Router();

    /* Auth Routes */
    versionRouter.post('/signin', authservice.signin);
    versionRouter.post('/signup', authservice.signup);
    /* Auth Routes */

    /* User Routes */
    versionRouter.post('/users', userservice.create);
    versionRouter.get('/users/:userId', userservice.read);
    versionRouter.put('/users/:userId', userservice.update);
    versionRouter.delete('/users/:userId', userservice.delete);
    /* User Routes */

    return versionRouter;
}
