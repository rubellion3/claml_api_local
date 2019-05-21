const express = require("express")
const mysql = require("mysql")
const app = express()

app.listen(3003), (req,res) =>{
    console.log("USE 3003 local host")
}
// mysql://bbac4540e8603d:5151c993@us-cdbr-iron-east-02.cleardb.net/heroku_c808d92fb94adc8?reconnect=true
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'official_ver2'
})

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql!");
});

app.get('/',(req,res) =>{
 res.send("This is an icd10 api makes by sharifz")
})

app.get('/sharp',(req,res) =>{
    conn.query("SELECT * FROM sharp_code", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
    })
})