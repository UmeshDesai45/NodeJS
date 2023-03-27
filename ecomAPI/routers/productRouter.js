const express= require('express');
const router= express.Router();
const Product= require('../models/products');

//POST product
router.post('/product', async (req, res)=>{
    const product= new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        images: req.body.images,
        category: req.body.category
    })
    try{
        const p1= await product.save();
        res.status(201).json(p1);
    }
    catch(err){
        res.send('Error '+err);
    }
});

//GET all products
router.get('/product', async (req, res)=>{
    try{
        const result= await Product.find();
        res.json(result);
    }
    catch(err){
        res.send('Error '+err);
    }
});

//GET product by id
router.get('/product/:id', async (req, res)=>{
    try{
        const result= await Product.find({_id: req.params.id});
        if(!result.length){
            res.status(404).send('Product not found');
        }
        res.json(result);
    }
    catch(err){
        res.send('Error '+err);
    }
});

//DELETE product by id
router.delete('/product/:id', async (req, res)=>{
    try{
        const result= await Product.deleteOne({_id: req.params.id});
        if(result.deletedCount===0){
            res.status(404).send('User not found');
        }
        res.status(204).send('product deleted');
    }
    catch(err){
        res.send('Error '+ err);
    }
});

//Update product by id
router.put('/product/:id', async (req, res)=>{
    try{
        //Getting user by id
        const product= await Product.updateOne({_id: req.params.id},{
            $set: {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                images: req.body.images,
                category: req.body.category
            }
        });
        if(product.nModified===0){
                res.status(404).send('user not found.');
        }
        res.json(product);
    }
    catch(err){
        res.send(err);
    }
});

module.exports= router;