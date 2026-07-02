const express=require('express');
const router=express.Router();
const {postLog}=require('../controller/logController');
router.post('/',postLog);
module.exports=router