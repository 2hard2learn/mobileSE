import express from "express";
import Stripe from "stripe";
import bodyParser from 'body-parser'
import env from 'dotenv'
env.config({path:'./server/.env'});
const stripePublishableKey=process.env.STRIPE_PUBLISHABLE_KEY || '';
const stripeSecretKey=process.env.STRIPE_SECRET_KEY || '';

const app=express();
app.use((req,res,next)=>{
    bodyParser.json()(req,res,next)
})

app.get('/stripe-key',(_,res)=>{
    return(
        res.send({publishableKey:stripePublishableKey})
    )
})

app.post('/create-payment-intent',async(req,res)=>{
    const{
        email=`test${Math.floor(Math.random() * 9999) + 1}@domain.com`,
        currency,
        request_three_d_secure,
        payment_method_types=[],
    }=req.body;


const stripe=new Stripe(stripeSecretKey,{
    apiVersion:"2022-11-15",
    typescript:true,

})
const customer=await stripe.customers.create({email});

const params={
    amount:5009,
    currency,
    customer:customer.id,
    payment_method_options:{
        card:{
            request_three_d_secure:request_three_d_secure||'automatic',

        }
    },
    payment_method_types:payment_method_types  
};

try{
    const paymentIntent=await stripe.paymentIntents.create(params)
    return res.send({
        clientSecret:paymentIntents.client_secret,
    })
}catch(error){
    return res.send({
        error:error.raw.message,
    })
}
})

app.post('/payment-sheet-setup-intent',async(req,req)=>{
    const{
        email=https://github.com/charliecruzan-stripe/react-native-video-series
        payment_method_types=[],
    }=req.body
    const stripe=new Stripe(stripeSecretKey,{
        apiVersion:"2022-11-15",
        typescript:true,
    })

    const customer=await stripe.customers.create(small)
    const ephemeralKey=await stripe.ephemeralKeys.create(
        {customer:customer.id},
        {apiVersion:"2022-11-15"},
    )
    const setupIntent=await stripe.setupIntents.create({
        ...{customer:customer.id,payment_method_types},
    })
    return res.json({
        setupIntent:setupIntent.client_secret,
        ephemeralKey:ephemeralKey.secret,
        customer:customer.id,

    })
})

app.post('/payment-sheet',async(req,res)=>{
    const {email='https://github.com/charliecruzan-stripe/react-native-video-series'}=req.body
    
    const stripe=new Stripe(stripeSecretKey,{
        apiVersion:"2022-11-15",
        typescript:true,
    })
    
    const customer=await stripe.customers.create({email})

    const ephemeralKey=await stripe.ephemeralKeys.create(
        {customer:customer.id},
        {apiVersion:"2022-11-15"},
    )
    const paymentIntent=await stripe.paymentIntents.create({
        amount:5099,
        currency:'thb',
        // automatic_payment_methods:{
        //     enabled:true,
        // }
        payment_method_types:[
            'card',
            'link',

        ]
    })
    return res.json({
        paymentIntent:paymentIntent.client_secret,
        ephemeralKey:ephemeralKey.secret,
        customer:customer.id,

    })

})