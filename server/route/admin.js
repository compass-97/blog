const express = require('express');
const router = express();
const db = require('../db/blog');
const passport = require('../lib/passport')(router);

router.get('/auth',(req,res)=>{
    if(req.user) {res.send('isauth')}
    else {res.send('needauth')}
})

router.get('/readpostlist',(req,res)=>{
    const sql = `select * from post`
    db.query(sql,(err,result)=>{
        if(err) console.log('select err')
        res.send(result)
    })
})
router.post('/createpost',(req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    const thumbnailurl = req.body.thumbnailurl
    const fin = req.body.fin
    const sql = `insert into post (title,content,thumbnail,fin) values(?,?,?,?)`
    db.query(sql,[title,content,thumbnailurl,fin],(err)=>{
        if(err) console.log('insert err')
        res.end()
    })
})

router.put('/updatepost/:id',(req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const thumbnailurl = req.body.thumbnailurl
    const fin = req.body.fin
    const sql = `update post set title = ? , content = ? , thumbnail = ? , fin = ? where id = ?`
    db.query(sql,[title,content,thumbnailurl,fin,id],(err,result)=>{
        if(err) console.log("update err")
        res.end()
    })
})

router.get('/getpriv',(req,res)=>{
    const sql = `select title,id from post where fin = ?`
    db.query(sql,['priv'],(err,result)=>{
        if(err) console.log('select err')
        res.send(result)
    })
})

router.delete('/deletepost/:id',(req,res)=>{
    const id = req.params.id
    const sql = `delete from post where id = ?`
    db.query(sql,[id],(err)=>{
        if(err) console.log('delete err')
        res.end()
    })
})

router.post('/login',passport.authenticate('local'),(req,res)=>{
    res.send(req.user)
})
router.get('/logout',(req,res)=>{
    req.logout()
    res.send('logout')
})

module.exports = router