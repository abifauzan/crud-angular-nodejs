var jwt = require('jsonwebtoken');

var getTokenFromHeaders = (req) => {
    var { headers: { authorization } } = req;
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401) // if there isn't any token

    return token;

    // if (authorization && authorization.split(' ')[0] === 'Token') {
    //     return authorization.split(' ')[1];
    // }

    // return null;
};

const auth = function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
    // return token;
    // if (token) return res.send(token);
    // jwt.verify(token,)
    // jwt.verify(token.toString(), 'secret-key', (err, user) => {
    //   console.log(err)
    //   if (err) return res.sendStatus(403)
    //   req.user = user
    //   next() // pass the execution off to whatever request the client intended
    // })
    jwt.verify(token, 'secret-key', (err, user) => {
        
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user
        console.log('req.user: ')
        console.log(req.user)
        next() // pass the execution off to whatever request the client intended
      })

    
  }

// var auth2 = {
//     required: jwt({
//         secret: 'secret',
//         userProperty: 'payload',
//         getToken: getTokenFromHeaders,
//         algorithms: ['RS256'],
//     }),
//     optional: jwt({
//         secret: 'secret',
//         userProperty: 'payload',
//         getToken: getTokenFromHeaders,
//         credentialsRequired: false,
//         algorithms: ['RS256'],
//     }),
// };

module.exports = auth;