const express= require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const auth=require('./routes/Auth')
const user=require('./routes/User')
const post=require('./routes/Post')
dotenv.config();

mongoose.connect(
    process.env.MONO_URL,{
        useNewUrlParser: true, 
         useUnifiedTopology: true 
    }
).then(()=>{
    console.log("Connected complete");
})

app.use(express.json());
app.use('/blog/auth',auth)
app.use('/blog/user',user)
app.use('/blog',post)
app.listen(3001)