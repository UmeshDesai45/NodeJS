const express= require('express');
const Item= require('../models/items');
const bodyParser = require('body-parser');
const router= express.Router();

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.get('/', (req,res)=>{
    let items= new Item();
    
    let data = items.all().then(value=>{
        console.log(value);
        res.send(value);
    });
});

router.post('/', (req,res)=>{
    let data= req.body;
    console.log(data);

    let items= new Item();
    let d= items.creat(data).then(val=>{
        res.send(val);
    });
    //res.send(data);
});

module.exports= router;


