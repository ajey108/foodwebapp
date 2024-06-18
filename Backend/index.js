import express from "express";
import {config} from "dotenv";
import mongoose from "mongoose";
import foodRoute from "./routes/foodRoute.js";
import { authRouter } from "./controllers/authController.js";
import { auth } from "./middleware/authMiddleware.js";
import cors from "cors";
import User from "./models/userModel.js";
import {v2 as cloudinary} from "cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import Stripe from "stripe";


config();

const app = express();

app.use(cors());

app.listen(process.env.PORT,()=> console.log(`listening on ${process.env.PORT} PORT`));

mongoose
.connect(process.env.mongodb)
.then(()=>console.log(`Database is connected`))
.catch((error)=> console.log(error));

app.use(express.json());
app.use('/food',foodRoute);


app.use('/auth',authRouter);

app.use(auth);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

app.use((req,res,next)=>{
    req.cloudinary = cloudinary;
    next();
});

const storage = new CloudinaryStorage
({
    cloudinary:cloudinary,
    params:{
        folder: 'image',
        allowedFormats:['jpeg','png','jpg'],

    }
});

// multer setup

const parser = multer({storage:storage});

app.post('/upload-image',parser.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).send("No file is uploaded.")
    }

    try{

        if (!req.file.path){
            throw new Error('File uploaded , but no path is available');
        }

        res.json({secure_url: req.file.path});

    } catch (error){
        console.error('Error during file upload: error');
        res.status(500).send('Internal server error');

    }
})


app.get('/userProfile',auth,async(req,res)=>{
    try{

        const user = await User.findById(req.user.id).select('password')
        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }

        res.json(user);

    } catch(erro){
        console.error(error);
        res.status(500).send('Server error');
    }
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//route to create a stripe checkout session

app.post('/create-checkout-session',async(req,res)=>{
  const {products,customerEmail} = req.body;

  const lineItems = products.map(product => ({
    price_data:{
        currency:'inr',
        product_data:{
           name:product.name 
        },
        unit_amount: product.priceInCents
    },
    quantity: product.quantity
  }))

  const productDetailsSerialized = JSON.stringify(prodcuts.map(prodcut =>({
    name:prodcut.name,
    quantity:product.quantity,
    price:product.priceInCents * 100

  }

  )))

  try{

    const session = await stripe.checkout.session.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      metadata: {productDetails:productDetailsSerialized},
      mode:'payment',
      customer_email:customerEmail,
      billing_address_collection:'required',
      success_url:`${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${process.env.FRONTEND_URL}/cancel`
    })

    res.json({id:session.id});

  } catch(error){
console.log('Failed to create checkout session:',error.message);
res.status(400).json({message:'Error creating checkout session'});
  }
})