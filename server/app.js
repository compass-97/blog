const express = require('express');
const app = express();
const Port = 8000;
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');

const options = {
    host: '',
    user: '',
    password: '@',
    database: ''
}
const sessionStore = new MySQLStore(options);

app.use(session({
    key:'session_key',
    secret:'session_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))
app.use(cookieParser());
app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static('uploads'));
app.use('/api',require('./route/api'));
app.use('/api/secure',require('./route/admin'));
app.use('/api/s3',require('./route/s3'));

app.listen(Port, () => {
    console.log(Port,"connected")
})
