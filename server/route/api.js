const express = require('express');
const router = express();
const db = require('../db/blog');

router.get('/readpostlist',(req,res)=>{
    const sql = `select * from post where fin = 'open'`
    db.query(sql,(err,result)=>{
        if(err) console.log('select err')
        res.send(result)
    })
})

router.get('/readpost/:id',(req,res)=>{
    const id = req.params.id
    const sql = `select * from post where id = ?`
    db.query(sql,[id],(err,result)=>{
        if(err) console.log('select err')
        res.send(result)
    })
})

module.exports = router;