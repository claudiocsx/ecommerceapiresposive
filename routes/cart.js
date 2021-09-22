const router = require('express').Router()
const { Router } = require('express')
const Cart = require('../models/Cart')
const { 
    verifyToken, 
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('./verifyToken')

router.post('/', verifyToken, async ( req, res ) => {
    const newCart = new Cart(req.body)

    try{
        const saveCart = await newCart.save()
        res.status(200).json(saveCart)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE
 router.put('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    
    try {
        const updateCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateCart)
    } catch (err) {
         res.status(500).json(err)
    }
})

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try{
        await Cart.findByIdAndDelete(req.params)
        res.status(200).json('Cart has bee deleted...')
    }catch(err){
        res.status(500).json(err)
    }
})

//GET USER Cart
router.get('/find/:userid', verifyTokenAndAuthorization, async (req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.userID})
        res.status(200).json(Cart)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL 
router.get('/', verifyTokenAndAdmin, async (req,res)=>{
    try{
        const cart = await Cart.find()
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router