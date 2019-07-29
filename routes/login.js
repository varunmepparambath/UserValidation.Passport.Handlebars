var express = require('express');
var router = express.Router();
let passport=require('passport');

/* GET users listing. */
router.get('/',checkNotAuthenticated,function(req, res) {
  res.render('login',{ message: req.flash() });
});
router.post('/',checkNotAuthenticated,passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/login',
  failureFlash:true
}))


function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    res.redirect('/profile');

  } else {
    //req.flash('error_msg','You are not logged in');
    return next();
  }
}
module.exports = router;
