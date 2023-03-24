const express= require('express');

const app= express();

const rout= require('./routers/rout');

app.use('/', rout);


app.listen(8000, ()=>{
    console.log('Server port - 8000');
})