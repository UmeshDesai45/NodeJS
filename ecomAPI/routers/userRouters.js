const express= require('express');
const router= express.Router();
const User= require('../models/users');

//GET all users
router.get('/user', async (req,res)=>{
    try{
        const users= await User.find();
        res.json(users);
    }
    catch(err){
        res.send('Error '+err);
    }
});

//GET user by id
router.get('/user/:id', async (req, res)=>{
    try{
        const user= await User.find({_id: req.params.id});
        if(!user.length){
            res.status(404).send('User not found');
        }
        res.json(user);
    }
    catch(err){
        res.send(err);
    }
});

//Update user info
router.put('/user/:id', async (req, res)=>{
    try{
        //Getting user by id
        const user= await User.updateOne({_id: req.params.id},{
            $set: {
                name: req.body.name,
                phone: req.body.phone,
                active: req.body.active
            }
        });
        if(user.nModified===0){
                res.status(404).send('user not found.');
        }
        res.json(user);
        
    }
    catch(err){
        res.send(err);
    }
});

//DELETE user by id
router.delete('/user/:id', async (req, res)=>{
    try{
        const user= await User.deleteOne({_id: req.params.id});
        if(user.deletedCount===0){
            res.status(404).send('user not found.');
        }
        res.status(204).send('User Deleted');
    }
    catch(err){
        res.send(err);
    }
});

//Post request
router.post('/user', async (req, res)=>{
    const user= new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active
    });
    try{
        const u1= await user.save();
        res.status(201).json(u1);
    }
    catch(err){
        console.error(err);
        res.send('Error '+err);
    }
})

module.exports= router;