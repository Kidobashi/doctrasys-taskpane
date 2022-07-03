const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mortarmax",
    database: "doctrasys"
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM documents;"
    db.query(sqlSelect, (err, result)=> {
        res.send(result);
    });
});

app.post("/api/insert", (req, res)=> {
    const senderName = req.body.senderName;
    const receiverName = req.body.receiverName;
    const senderOffice = req.body.senderOffice;
    const receiverOffice = req.body.receiverOffice;

    const sqlInsert = "INSERT INTO documents (referenceNo, senderName, receiverName, senderOffice, receiverOffice, created_at) VALUES ('12123512',?,?,?,?, NOW());"

    db.query(sqlInsert, [senderName, receiverName, senderOffice, receiverOffice], (err, result)=> {
        console.log(result);
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