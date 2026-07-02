const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
const logRoutes=require('./routes/logRouter');
app.use('/api/logs',logRoutes);
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server active on port ${PORT}`);
});