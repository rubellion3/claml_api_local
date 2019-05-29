const express = require("express")
const mysql = require("mysql")
const app = express()
const PORT = process.env.PORT || 3003;

app.listen(PORT), (req,res) =>{
    console.log("USE 3003 local host")
}
// mysql://bbac4540e8603d:5151c993@us-cdbr-iron-east-02.cleardb.net/heroku_c808d92fb94adc8?reconnect=true
// mongodb+srv://rubellion3:<password>@cluster0-4uldx.mongodb.net/test?retryWrites=true
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
})

const conn_stat = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'statistic'
})

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql!");
});
conn_stat.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql! database:stat");
});

app.get('/',(req,res) =>{
 res.send("This is an icd10 api makes by sharifz")
})

app.get('/icd10',(req,res) =>{
    conn.query("SELECT * FROM icd10_relationship", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
    })
})

app.get('/term',(req,res) =>{
    conn.query("SELECT * FROM term_table", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
    })
})

app.get('/term/:id',(req,res) =>{
    let term_id = req.params.id;
    if (!term_id) {
        return res.status(400).send({ error: true, message: 'Please provide term_id' });
       }
    conn.query("SELECT * FROM term_table where term_id=?", term_id,(err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
    })
})

app.get('/term/:id/:type',(req,res) =>{
    let term_id = req.params.id;
    let type = req.params.type;
    if (!term_id) {
        return res.status(400).send({ error: true, message: 'Please provide term_id' });
       }
    conn.query("SELECT * FROM term_table where term_id=? and typeId=?", [term_id,type],(err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
    })
})

app.get('/category_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_category_stat", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/codeType_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_codekind_all", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/codeType_chap_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_codekind_bychapter", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/subCat_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_all", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/mod_1digit_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_1digitmodifer", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/mod_2digit_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_2digitmodifer", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})


app.get('/mod_code_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_modifieronly", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/code_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_normalonly", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

