let LocalStrategy = require('passport-local').Strategy;
let bcrypt=require('bcrypt');


function  initialize(passport,getUserByEmail,getUserById) {

    let authenticateUser = async (email, password, done) => {
        let user = getUserByEmail(email);
        if (user == null)
            return done(null, false, {message: "No User with that Email"});
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else
                done(null, false, {message: 'Password Incorrect'})
        } catch (e) {
            return done(e);
        }
    }
    console.log(passport);
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
           return done(null, getUserById(id))
    })

};

module.exports=initialize;