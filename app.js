const express = require("express")
const mysql = require("mysql")
const app = express()
const PORT = process.env.PORT || 3003;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(PORT), (req,res) =>{
    console.log("USE 3003 local host")
}
// mysql://bbac4540e8603d:5151c993@us-cdbr-iron-east-02.cleardb.net/heroku_c808d92fb94adc8?reconnect=true
// mongodb+srv://rubellion3:<password>@cluster0-4uldx.mongodb.net/test?retryWrites=true

const conn_stat = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'statistic'
})



// conn.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected to mysql!");
// });
conn_stat.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql! database:stat");
});

app.get('/',(req,res) =>{
 res.send("This is an icd10 api makes by sharifz")
})

app.get('/category_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_category_stat c ORDER BY c.character", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/codeType_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_codekind_all", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/codeType_chap_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_codekind_bychapter", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/subCat_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_all", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/mod_1digit_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_1digitmodifer", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/mod_2digit_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_2digitmodifer", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})


app.get('/mod_code_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_modifieronly", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/code_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM icd10_subcategory_stat_normalonly ORDER BY alpha", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/mesh_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM mesh_stat;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})

app.get('/icd10_tm_pcu_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM `number_of_icd10_tm_pcu(14)`;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("icd10_tm_pcu_stat")
    })
})

