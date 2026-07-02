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

