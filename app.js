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

const conn_network = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'network'
})

const conn_search = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'search'
})


conn.connect(function(err) {
    if (err) throw err;
    // console.log("Connected to mysql!");
});
conn_stat.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql! database:stat");
});

conn_search.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql! database:search");
});
conn_network.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql! database:network");
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

app.get('/keyword',(req,res) =>{
    conn_search.query("SELECT * FROM all_keyword2  order by id desc    ", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("keyword")
    })
})

app.get('/icd_phase',(req,res) =>{
    conn_search.query("SELECT * FROM icd10withkeyid  limit 10000", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("phase")
    })
})

app.get('/icd_phase/:id',(req,res) =>{
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
       }
    conn_search.query("SELECT * FROM icd10withkeyid where keywordId=?",id, (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("icd10 phase")
    })
})

app.get('/mesh_phase/:id',(req,res) =>{
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
       }
    conn_search.query("SELECT * FROM meshwithkeyid where keywordId=?",id, (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("mesh phase")
    })
})

app.get('/snomed_phase/:id',(req,res) =>{
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
       }
    conn_search.query("SELECT * FROM snomedwithkeyid where keywordId=?",id, (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("snomed phase")
    })
})

app.get('/thai_phase/:id',(req,res) =>{
    let id = req.params.id;
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
       }
    conn_search.query("SELECT * FROM thaiwithkeyid where keywordId=?",id, (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("thai phase")
    })
})


// statistic
app.get('/category_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_category_stat", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("claml_category_stat")
    })
})

app.get('/codeType_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_codekind_all", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("claml_codekind_all")
    })
})

app.get('/codeType_chap_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_codekind_bychapter", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("claml_codekind_bychapter")
    })
})

app.get('/subCat_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_all", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("claml_subcategory_stat_all")
    })
})

app.get('/mod_1digit_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_1digitmodifer", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("claml_subcategory_stat_1digitmodifer")
    })
})

app.get('/mod_2digit_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_2digitmodifer", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("claml_subcategory_stat_2digitmodifer")
    })
})


app.get('/mod_code_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_modifieronly", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("claml_subcategory_stat_modifieronly")
    })
})

app.get('/code_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_normalonly", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("claml_subcategory_stat_normalonly")
    })
})


app.get('/icd10_tree/child',(req,res) =>{
    let type = req.params.type;
    conn_network.query("SELECT  source_code,destination_code,destinationtype FROM network.icd10_tree where destinationtype='child'",type, (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("icd10_tree")
    })
})

app.get('/icd10_tree/parent',(req,res) =>{
    let type = req.params.type;
    conn_network.query("SELECT  source_code,destination_code,destinationtype FROM network.icd10_tree where destinationtype='parent'",type, (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("icd10_tree")
    })
})

app.get('/icd10_tree/source',(req,res) =>{
    let type = req.params.type;
    conn_network.query("SELECT * FROM network.icd10_source LIMIT 10",type, (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("icd10_tree")
    })
})
app.get('/icd10_tree/source_link',(req,res) =>{
    let type = req.params.type;
    conn_network.query("SELECT * FROM network.icd10_relation LIMIT 10",type, (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("icd10_tree_link")
    })
})
app.get('/mesh_tree',(req,res) =>{
    conn_network.query("SELECT * FROM mesh_tree", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("mesh_tree")
    })
})

app.get('/snomed_tree',(req,res) =>{
    conn_network.query("SELECT * FROM snomed_tree", (err,rows,fields) =>{
        console.log("fecth.....")
        if (err) throw err;
            res.json(rows)
            console.log("snomed_tree")
    })
})
