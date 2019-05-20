const express = require("express")
const mysql = require("mysql")
const app = express()

app.listen(3003), (req,res) =>{
    console.log("USE 3003 local hsot")
}

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'data'
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