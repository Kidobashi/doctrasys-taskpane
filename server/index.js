const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const date = require('date-and-time');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mortarmax",
    database: "doctrasys"
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

// app.get('/api/get', (req,res) => {
//     const sqlSelect = "SELECT COUNT(id) FROM documents;"
//     db.query(sqlSelect, (err, result)=> {
//         // res.send(result);
//         console.log(result);
//     });
// });

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM documents;"
    db.query(sqlSelect, (err, result)=> {
        const now = new Date();
        const data = date.format(now, 'YYYYMMDD');
        const length = result.length;
        const referenceNo =  data + "00" + length;
        res.send(referenceNo);
        console.log(referenceNo);
    });
});

app.post("/api/insert", (req, res)=> {
    const now = new Date();
    const senderName = req.body.senderName;
    const receiverName = req.body.receiverName;
    const senderOffice = req.body.senderOffice;
    const receiverOffice = req.body.receiverOffice;
    let queryLastId = "SELECT * FROM documents";
    // let length = queryLastId.length;

    db.query(queryLastId, (err, result)=> {
        const data = date.format(now, 'YYYYMMDD');
        const length = result.length;
        const referenceNo =  data + "00" + length;
        const sqlInsert = "INSERT INTO documents (referenceNo, senderName, receiverName, senderOffice, receiverOffice, created_at) VALUES (?,?,?,?,?, NOW());"
        console.log(result.length);
        db.query(sqlInsert, [referenceNo, senderName, receiverName, senderOffice, receiverOffice], (err, result)=> {
            console.log(result);
        });
    });
});


// app.get("/", (req, res)=> {
//     // const sqlInsert = "INSERT INTO documents (referenceNo, senderName, receiverName, senderOffice, receiverOffice, created_at) VALUES ('1231235235', 'freedo', 'odeerf', '1', '2', NOW());"
//     // db.query(sqlInsert, (err, result)=> {
//     //     res.send("Hello World 222");
//     // });
// });

app.listen(3001,() => {
    console.log("Running on port 3001");
});