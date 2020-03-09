let router = require('express').Router();

router.get('/', (req, res) => {
        res.json({
            status: 200,
            message: 'helloo '
        })
    }
);

var userController = require('../controllers/user.controller');

router.route('/user')
    .get(userController.index)
    .post(userController.new)
router.route('user/:id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete)

module.exports = router;