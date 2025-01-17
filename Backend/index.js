const port=4000;
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const multer=require('multer')
const path=require('path')
const cors=require('cors');
const { type } = require('os');
const { error } = require('console');

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/")

app.get("/",(req,res)=>{
    res.send("Port is running on "+port)
})

// Image storage engine

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})
//creating upload endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creating product

const Product=mongoose.model('Product',{
    id:{
        type:Number,
        required:true, 
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    }
})

// creating api for add product

app.post('/addproduct',async(req,res)=>{
    const products=await Product.find({})
    let id;
    if(products.length){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0]
        id=last_product.id+1
    }else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    })
    console.log(product)
    await product.save()
    console.log("saved")
    res.json({
        success:true,
        name:req.body.name
    })
})

// creating api for removing product

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed")
    res.json({
        success:true,
        name:req.body.name
    })
})

// creating api for getting all products

app.get('/allproducts',async (req,res)=>{
    const products=await Product.find({})
    console.log("All products fetched")
    res.send(products)
})

// User schema model

const User=mongoose.model('Usser',{
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// api for creating an user

app.post("/signup",async(req,res)=>{
    let check= await User.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,error:"Existing email found with same email address"})
    }
    let cart={}
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new User({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save()

    const data={
        user:{
            id:user.id
        }
    }

    const token=jwt.sign(data,"secret_ecm")
    res.json({success:true,token})
})

app.post("/signin",async(req,res)=>{
    let user=await User.findOne({email:req.body.email})
    if(user){
        const passMatch=req.body.password == user.password;
        if(passMatch){
            const data={
                user:{
                    id:user.id
                }
            }
            console.log(data)
            const token=jwt.sign(data,"secret_ecm");
            res.json({success:true , token})
        }else{
            res.json({success:false , error:"Wrong password"})
        }
    }else{
        res.json({success:false, error:"Wrong Email"})
    }
})

// creating endpoint for latest products
app.get("/newcollections",async(req,res)=>{
    let products= await Product.find({})
    let newcollection=products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newcollection)
})

// creating endpoint for popular products
app.get('/popularcollections',async(req,res)=>{
    let products=await Product.find({category:"men"})
    let popularproducts= products.slice(0,4)
    console.log("Popular products fetched")
    res.send(popularproducts);
})


// creating middleware to fetch user

const fetchuser=async(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({Error:"Please authenticate using valid id"})
    }else{
        try{
            const data=jwt.verify(token,"secret_ecm")
            req.user=data.user;
            next();
        }catch(error){
            res.status(401).send({Error:"Please authenticate using valid id"})
        }
        
    }
}

// creating endpoint for adding products in cartdata
app.post('/addtocart',fetchuser,async(req,res)=>{
    console.log("Added",req.body.itemId)
    let userData= await User.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId]+=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("added");
})

// creating endpoint for removing products in cartdata

app.post("/removefromcart",fetchuser,async(req,res)=>{
    console.log("removed",req.body.itemId)
    let userData= await User.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
        userData.cartData[req.body.itemId]-=1;
        await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("added");
})

// creating endpoint for getting cart data

app.post("/getcart",fetchuser,async(req,res)=>{
    console.log("get cart")
    let userData= await User.findOne({_id:req.user.id})
    res.json(userData.cartData);
})

app.listen(port, (error)=>{
    if(!error){
        console.log("The app is running on port "+port)
    }
    else{
        console.log("Error: "+error)
    }
})