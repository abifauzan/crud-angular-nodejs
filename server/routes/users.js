var mongoose = require('mongoose');
var passport = require('passport');
var router = require('express').Router();
var jwt = require('jsonwebtoken');
var auth = require('./auth');

var Users = require('../models/User');
mongoose.model('Users');

// POST new user route (optional, everyone has access)
router.post('/signup', (req, res, next) => {
  var user = req.body;

  // return res.send(req.body);
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  var finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/signin', (req, res, next) => {
  const user = req.body;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      var user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.json({message:'User not found'});
  })(req, res, next);
});

router.get('/', auth, async (req, res, next) => {
//   Product.find((err, data) => {
//     if (err) return next(err);
//     res.json({
//         message: 'fetched all data successfully',
//         data
//     });
// });

  const users = await Users.find();
  if (!users) {
    return res.sendStatus(400);
  }
  return res.json({ 
    message: 'fetched all users',
    users
  });
})

//GET current route (required, only authenticated users have access)
router.get('/current', auth, async (req, res, next) => {

//   jwt.verify(req.token, 'secret-key', (err,authorizedata) => {
//     if(err) {
//         console.log('Error : Could not connect to the protected route');
//         res.sendStatus(403);
//     } else {
//         res.json({
//             message : 'Successful log in',
//             authorizedata
//         });
//         console.log('Success : Connected to protected route');
//     }

// });
  // return res.send(req.user)
  var payload = req.user;

  // return res.send(payload);
  const user = await Users.findById(payload.id);
  if (!user) {
    return res.sendStatus(400);
  }
  return res.json({ user: user.toAuthJSON() });
});

module.exports = router;
