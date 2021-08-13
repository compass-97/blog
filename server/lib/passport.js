const bcrypt = require('bcrypt');
const db = require('../db/blog');

module.exports = (app) =>{
    const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((name,done)=>{
        done(null,name);
    })
    
    passport.deserializeUser((name,done)=>{
        var sql = `select * from admin where name = ?`
        db.query(sql,[name],(err,result)=>{
            done(null, result[0].name)
        })
    })

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password'
    },
    (id,password,done) => {
        const sql = `select * from admin where name = ?`
        db.query(sql,[id],(err,result)=>{
            if(err) console.log('select err')
            if(result.length > 0){
                bcrypt.compare(password,result[0].password,(err,res)=>{
                    if(res){
                        return done(null,result[0].name)
                    } else {
                        console.log('password fail')
                        return done(null,false,{
                            message: 'incorrect password'
                        })
                    }
                })
            } else {
                console.log('fail')
                return done(null,false,{message: 'incorrect'})
            }
        })
    }))
    return passport;
}