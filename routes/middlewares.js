var middlewares = {
    hasRole: function (role) {
        return function (req, res, next) {
            if (req.session.user.roles.indexOf(role) != -1) {
                next();
            } else {
                if (req.xhr || req.headers.accept.indexOf('json') > -1)
                    res.status(401).json({message: 'Нет доступа'});
                else
                    res.redirect('/permission');
            }
        }
    },
    isAuthorized: function (req, res, next) {
        if (req.session.user) {
            next();
        } else if (req.originalUrl == "/api/payments") {
            next();
        } else {
            if (req.xhr || req.headers.accept.indexOf('json') > -1)
                res.status(401).json({message: 'Необходима авторизация'});
            else
                res.redirect('/auth');
        }
    }
};
module.exports = middlewares;
