const User = require('../models/user.model');
exports.index = (req, res) => {
    User.get((err, user) => {
        if (err) {
            res.json({
                status: 'error',
                message: err
            });
        }
        res.json({
            status: 200,
            message: 'User Retrived Successfully',
            data: user
        });

    });
}
exports.new = (req, res) => {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name
    user.gender = req.body.gender
    user.phone = req.body.phone
    user.email = req.body.email
    user.save((err) => {
        if (err) res.json(err)
        res.json({
            message: 'User Created',
            data: user
        });
    });
}

exports.view = (res, req) => {
    User.findById(req.params.id, (err, user) => {
        if (err) res.send(err)
        res.json({
            message: 'user found',
            data: user
        });
    });
}

exports.update = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) res.send(err)
        user.name = req.body.name ? req.body.name : user.name;
        user.gender = req.body.name;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.save((err) => {
            if (err) res.json(err)
            res.json({
                message: 'User Info Updated',
                data: user
            });
        });
    });
}

exports.delete = (req, res) => {
    User.remove({
        _id: req.params.id
    }, (err, user) => {
        if (err) res.send(err)
        res.json({
            message: 'User Deleted',
            data: user
        });
    });
}