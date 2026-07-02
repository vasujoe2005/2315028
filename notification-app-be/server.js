const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const priNotiRoutes=require('./routes/priNotiRoutes');
app.use(express.json());
app.use(cors());
app.use("/",priNotiRoutes);
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server active on port ${PORT}`);
});

