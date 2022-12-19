const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(()=>app.listen(process.env.PORT || 1337,()=>{
        console.log("DB Connected and Server Running")
    }))
    .catch((err)=>{
        console.log(err)
    });

app.use(express.json());
app.use(cors());

const bookRoute = require('./routes/book');
const userRoute = require('./routes/user')

app.use('/api/books',bookRoute)
app.use('/api/users',userRoute)