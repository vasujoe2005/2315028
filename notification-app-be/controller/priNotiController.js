const {postLog}=require('../../logging-middleware/server')
const fs=require('fs');
const path=require('path');
const filePath=path.join(__dirname,"../notifications.json");
exports.getPriorityNotification=(req,res)=>{
    postLog({
        server: "backend",
        level: "info",
        package: "controller",
        message: "Priority notifications requested."
    });
    const data=JSON.parse(fs.readFileSync(filePath,"utf-8"));
    const placement=data.notification.filter(
        notification=>notification.type==="Placement"
    );
    const result=data.notification.filter(
        notification=>notification.type==="Result"
    );
    const event=data.notification.filter(
        notification=>notification.type==="Event"
    );
    const priorityNotification=[...placement,...result,...event];
    res.status(200).json({
        notification:priorityNotification
    });
};
