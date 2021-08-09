const express = require('express');
const app = express();
const Port = 8000;
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname+'/config/s3.json');

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'compass-s3-blog-bucket',
        acl: 'public-read-write',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function(req,file,cb){
            cb(null,Date.now().toString()+file.originalname);
        }
    })
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static('uploads'));

const options = {
    host: 'localhost',
    user: 'root',
    password: 'cbm96439633@',
    database: 'blog'
}

const db = mysql.createPool(options)

app.post('/api/createpost',(req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    const thumbnailurl = req.body.thumbnailurl
    const sql = `insert into post (title,content,thumbnail) values(?,?,?)`
    db.query(sql,[title,content,thumbnailurl],(err)=>{
        if(err) console.log('insert err')
        res.end()
    })
})

app.get('/api/readpostlist',(req,res)=>{
    const sql = `select * from post`
    db.query(sql,(err,result)=>{
        if(err) console.log('select err')
        res.send(result)
    })
})
app.get('/api/readpost/:id',(req,res)=>{
    const id = req.params.id
    const sql = `select * from post where id = ?`
    db.query(sql,[id],(err,result)=>{
        if(err) console.log('select err')
        res.send(result)
    })
})

app.put('/api/updatepost/:id',(req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const thumbnailurl = req.body.thumbnailurl
    const sql = `update post set title = ? , content = ? , thumbnail = ? where id = ?`
    db.query(sql,[title,content,thumbnailurl,id],(err,result)=>{
        if(err) console.log("update err")
        res.end()
    })
})

app.delete('/api/deletepost/:id',(req,res)=>{
    const id = req.params.id
    const sql = `delete from post where id = ?`
    db.query(sql,[id],(err)=>{
        if(err) console.log('delete err')
        res.end()
    })
})

app.post('/api/imageupload',upload.single('image'),(req,res)=>{
    res.send(req.file.path)
})

app.post('/api/thumbnail',upload.single('thumbnail'),(req,res)=>{
    res.send(req.file.location)
})

app.listen(Port, () => {
    console.log(Port,"connected")
})