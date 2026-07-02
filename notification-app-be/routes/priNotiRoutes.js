const express=require('express');
const router=express.Router();
const {getPriorityNotification}=require('../controller/priNotiController');
router.get("/getPriorityNotification", getPriorityNotification);
module.exports=router;