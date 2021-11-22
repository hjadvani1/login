const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/taskdb',()=>{
    
    console.log('connected to db');
}
)
mongoose.set('debug', true);

const router = require('./routes/route');
// const { debug } = require('console');



dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.set('view engine','html')
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.json());
app.use('/api/user',router)
app.listen(process.env.PORT,(err)=>
{
    if(!err)
    {
        console.log('connected to port 3000');
    }
    else
    {
        console.log('something is wrong');
    }
});
