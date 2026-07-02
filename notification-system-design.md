# Notification System Design
Stage 1:

REST API Design:
Assume authenication is done

Notification={
    ID : String,
    Type : String,
    Message : String,
    TimeStamp : Date 
}

GET /notifications
    this will display all the notifications we stored in the db

Request:  GET  http://localhost:5000/notifications
Response:{
    notifications:[
        {
            "ID":"001"
            "Type":"Result"
            "Message":"Mid term results are out"
            "Timestamp":"2026-07-02 11:30:10"
        },
        {
            "ID":"002"
            "Type":"Placements"
            "Message":"Company XYZ is scheduled for placemnt drive on 5th July"
            "Timestamp":"2026-07-02 12:30:10"
        }....and so on
    ]
}

POST /addNotification
    this is add a new Notification object of data to the db

Request:  POST  http://localhost:5000/addNotifications
Body:{
        "ID":"003"
        "Type":"Event"
        "Message":"National level Symposisum is planned"
        "Timestamp":"2026-06-03 11:30:10"
    }
Response:{
    Notification added successfully
}

GET /:ID
    this will display the notification that matches the ID of the inputed ID

Request:  GET  http://localhost:5000/001
Response:{
    notifications:[
        {
            "ID":"001"
            "Type":"Result"
            "Message":"Mid term results are out"
            "Timestamp":"2026-07-02 11:30:10"
        }
    ]
}

GET /:Type
    this will filter the notifications by the type and display the asked type of notification alone

Request:  GET  http://localhost:5000/Placements
Response:{
    notifications:[
        {
            "ID":"002"
            "Type":"Placements"
            "Message":"Company XYZ is scheduled for placemnt drive on 5th July"
            "Timestamp":"2026-07-02 12:30:10"
        },{
            "ID":"004"
            "Type":"Placements"
            "Message":"Company ABC is scheduled for placemnt drive on 5th Auhgust"
            "Timestamp":"2026-07-04 12:30:10"
        }
    ]
}

PUT /:ID
    this will allow user to modify the notification details and save it back to db

Request:  PUT   http://localhost:5000/003
Body:{
        "Message":"Inter - National level Symposisum is planned"
    }
Response:{
    Notification updated successfully
}

DELETE /:ID
    this will allow user to delete the notification by means of the inputed id of the notification 

Request: DELETE  http://localhost:5000/002
Response:{
    Notification deleted successfully
}



STAGE 2:

Database selection and design:

I choose MongoDB as db for this application because it is flexible schema and it supports json formats and it can manage large number of datas also it is fast for retrival of data as it uses indexes

Schemas:
Collection name : notifications
Notification
{
    _id: ObjectId,
    ID: String,
    Type: String,
    Message: String,
    Timestamp: Date
}


GET /notifications
    Query: db.notifications.find().sort({ Timestamp: -1 }) 
    here we are displaying the recent ones first by sorting using timestamp in desc order

POST /addNotification
    Query: db.notifications.insertOne({
        ID:"003",
        Type:"Event",
        Message:"National level Symposium is planned",
        Timestamp:new Date("2026-06-03T11:30:10")
    })
    here instead of using static "" we can get using post command to a variavle and equalise that variable here.that will add the values to the db

GET /:ID
    Query: db.notifications.find({
        ID:"001"
    })
    this will find the notification with that id from db and will return it

GET /:Type
    Query: db.notifications.find({
        Type:"Placements"
    })
    this will find the notification with that type from db and will return it

PUT /:ID
    Query: db.notifications.updateOne(
        {
            ID:"003"
        },
        {
            $set:{Message:"Inter-National level Symposium is planned"}
        }
    )
    this will update the message of the notification if we mention type instead of message in the $set we can update the type also

DELETE /:ID
    Query: db.notifications.deleteOne({
        ID:"002"
    })
    this will the notification with that particular id

Problems that are caused by increased data size:
    *query processing time will be prolonged
    *Increase API response time
    *higher storage requirements
    *Bottleneck in performance

Remedies:
    *Pagination: Only retrive a certain number of data at a time to reduce workload ex. using LIMIT=20
    *Indexing: helps in easy retrival and fast searching of data 
    *Load Balancing: Split the load according to the availability of the resources to handle traffic
    *Caching: Cache the frequently used data in a local storage to reduce the load



STAGE 3:

Query Optimization:

given that a query in SQL DB is
    select * from notifications where studentID=1042 and isRead=false order by createdAt asc;
 
yes this query is accurate to retrive the all unread notification of a particular student but it will show the earliest notification forst as it is order by asc of timestamp

When the notification is increased massively this query execution time will be slower as lot of query also if the total students is around 50000 retirving that it self takes time

change that i would recommand is to use pagination to retrive onlt small batch of the related data 

adding indexes will be effective for faster retival but for large datasets it will consume additional storage and only select will be faster dml operations will be slower 

query to find all stds who got a placement notification in last 7 days :
select distinct studentID from notification where notificationType='Placemnt' and createdAt>=now()-interval 7 day;

STAGE 4:

Now every time a student opens the notification page all the notifications are fetched from the database. When thousands of students open the application at the same time the database receives a huge number of requests, making the response slower and giving a poor user experience.

One solution i would recommend is Pagination. Instead of retrieving all the notifications at once, only a small batch (for example 20 notifications) should be loaded. When the user scrolls or goes to the next page, the next set of notifications can be fetched. This reduces the amount of data transferred, decreases database load and improves the response time. 

Another solution is Load Balancing. Instead of sending all user requests to a single application server, a load balancer distributes the requests among multiple servers. This prevents one server from getting overloaded and improves the overall performance of the application.

By using Pagination along with Load Balancing, the notification system can handle a large number of students efficiently while providing faster response times and a better user experience.

