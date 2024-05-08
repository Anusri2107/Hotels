const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newItem = new MenuItem(data);
        const response = await newItem.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/',async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:taste', async (req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste=='sweet' || taste=='sour' || taste=='spicy'){
            const response = await MenuItem.find({taste: taste});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid taste type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const menuItemId = req.params.id;
        const updatedMenuItem = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuItemId,updatedMenuItem,{
            new: true,
            runValidators: true
        })
        if(!response){
            return res.status(404).json({error: 'Menu Item not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const menuItemId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuItemId);
        if(!response){
            return res.status(404).json({error: 'Menu Item not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'Menu Item deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;