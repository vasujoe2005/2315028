const axios=require('axios');
const dotenv=require('dotenv');
dotenv.config();
exports.postLog=async(req,res)=>{
    const {server,level,package,message}=req.body;
    if(!server||!level||!package||!message){
        return res.status(400).json({error:'Fields are missing'});
    }
    try{
        const log=await axios.post(process.env.LOG_API,{
            server,level,package,message
        },
        {
            headers:{
                "Authorization":`Bearer ${process.env.BEARER_TOKEN}`
            }
        });
        console.log('Log posted ',log.data);
        res.status(200).json(log.data);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
