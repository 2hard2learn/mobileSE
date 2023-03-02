import express from "express";
import Stripe from "stripe";
const app=express();

const port=3000;
const PUBLISHABLE_KEY='pk_test_51MZcCtCZp5yHCVLLauwAwoC54CoJZS0j7xt974JeCBl85RfpR4NPF1JEmBFF7AxkXjrFj6Lp7luD47K4Jo5nuITW00ca68xEpx'
const SECRET_KEY='sk_test_51MZcCtCZp5yHCVLLMYStLV1ALYtrYp42ymXNmnC2H8wzRynNah63Hjoi4kZXHFvHA3ROYmMR6ain4r5T0jLPgIKL00eKFL4lOX'
const stripe=Stripe(SECRET_KEY,{apiVersion:"2022-11-15"})

app.get('/', function(req, res, next) {
    res.send("Stripe API Connection Successful!");
});
app.listen(port,()=>{
    try{
        console.log() 
        console.log(`Listenning on port http://192.168.1.11:${port}`)
    }
    catch(e){
        console.log(e)
    }
    
});

app.post("/create-payment-intent",async(req,res)=>{
    try{
        const paymentIntent=await stripe.paymentIntents.create
        ({
            amount:1099, //lowest denomination particulary currency
            currency:"thb",
            payment_method_types:['card'], //default

        })
        const clientSecret=paymentIntent.client_secret;
        res.json({
            clientSecret:clientSecret,
        })
    }catch(e){
        console.log(e.message)
        res.json({error:e.message})
    }
})

