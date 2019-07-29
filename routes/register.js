var express = require('express');
var router = express.Router();
let bcrypt=require('bcrypt');

const users=[];
/* GET home page. */
router.get('/',checkNotAuthenticated, function(req, res) {
    res.render('Register');
});

/* Form POST */
router.post('/',async (req, res)=>{
    try{
        let hashedPassword= await bcrypt.hash(req.body.password,10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        console.log(hashedPassword);
        console.log(users);
        res.redirect('/login');
    }
    catch (e) {
    }
    console.log(users);

});

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/profile');

    } else {
        //req.flash('error_msg','You are not logged in');
        return next();
    }
}

module.exports = {router:router,users:users};
