const express = require('express');
const router = express();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.loadFromPath(__dirname+'/../config/s3.json');

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

router.post('/thumbnail',upload.single('thumbnail'),(req,res)=>{
    res.send(req.file.location)
})

module.exports = router