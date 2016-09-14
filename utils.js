var config= require('./config');
module.exports.fetch = function (headers) {
    if (headers && headers.authorization) {
        var authorization = headers.authorization;
        var part = authorization.split(' ');
        if (part.length === 2) {
            var token = part[1];
            return part[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports.middleware = function () {

    var func = function (req, res, next) {

        var token = exports.fetch(req.headers);

        if (token) {
          // verifies secret and checks exp
          jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
              return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
              // if everything is good, save to request for use in other routes
              req.decoded = decoded;
              next();
            }
          });

        } else {

          // if there is no token
          // return an error
          return res.status(403).send({
              success: false,
              message: 'No token provided.'
          });
        }
    };

    return func;

};
