const express= require('express');
const app= express();
const port= 8003;
const mongoose= require('mongoose');

const url= 'mongodb://127.0.0.1:27017/ecomDB';

//connecting to DB
mongoose.connect(url, {useNewUrlParser: true})
.then(()=>{
    console.log('Connected..');
})
.catch(err=> console.log(err));

const productRouter= require('./routers/productRouter');
const userRouter= require('./routers/userRouters');
//Middleware
app.use(express.json());
app.use('/', productRouter);
app.use('/', userRouter);

//Creating server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});