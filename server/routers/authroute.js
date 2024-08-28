const express = require('express');
const { getLoginUsers, handleLoginFunction, handleforgetpassword } = require('../controllers/auth');
const passport = require('passport');

const router = express.Router();

router.post('/login', handleLoginFunction);

router.get('/login', getLoginUsers);
  
router.post('/forgetpassword', handleforgetpassword);
  
router.get('/forgetpassword', (req, res) => {
    res.send({msg : 'password changed successfully'})
})
  
router.get('/google', passport.authenticate('google', {
    scope : ['email', 'profile']
}))
  
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login/failed'
  }), (req, res) => {
    res.cookie('uid', req.user.id);
    res.redirect(process.env.CLIENT_URL); 
});


module.exports = router;