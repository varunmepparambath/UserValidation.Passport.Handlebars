var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/',checkAuthenticated ,function(req, res, next) {
  res.render('index', {title: req.user.name});
});

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/login')
  }
}
// title: regRouter.users[0].name
module.exports = router;
