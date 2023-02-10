import { Express  } from "express";
const app=express();
const port=3000;
const PUBLISHABLE_KEY='pk_test_51MZcCtCZp5yHCVLLauwAwoC54CoJZS0j7xt974JeCBl85RfpR4NPF1JEmBFF7AxkXjrFj6Lp7luD47K4Jo5nuITW00ca68xEpx'
const SECRET_KEY='sk_test_51MZcCtCZp5yHCVLLMYStLV1ALYtrYp42ymXNmnC2H8wzRynNah63Hjoi4kZXHFvHA3ROYmMR6ain4r5T0jLPgIKL00eKFL4lOX'

app.listen(port,()=>{
    console.log(`Listenning on port http://localhost:${port}`)
});

