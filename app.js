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

app.get('/new_block_stat',(req,res) =>{
    conn_stat.query("SELECT *, fromRoman(CHAPTER) Roman FROM statistic.block_stat_new ORDER BY Roman;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("new_block_stat")
    })
})
app.get('/new_cat_stat',(req,res) =>{
    conn_stat.query("SELECT *, fromRoman(CHAPTER) Roman FROM statistic.category_stat_new ORDER BY Roman;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("new_cat_stat")
    })
})
app.get('/new_subCat_stat',(req,res) =>{
    conn_stat.query("SELECT *, fromRoman(CHAPTER) Roman FROM statistic.sub_category_stat_new order by Roman;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("new_subCat_stat")
    })
})

app.get('/mod_1digit_chap_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM statistic.icd10_subcategory_stat_1digitmodifer_bychapter;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_1digit_chap_stat")
    })
})

app.get('/mod_2digit_chap_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM statistic.icd10_subcategory_stat_2digitmodifer_bychapter;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_2digit_chap_stat")
    })
})

app.get('/mod_total_chap_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM statistic.icd10_subcategory_stat_modifieronly_bychapter;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_total_chap_stat")
    })
})

app.get('/block_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM statistic.block_stat_new_alpha;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("block_stat")
    })
})

app.get('/category_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM statistic.category_stat_new_alpha;", (err,rows,fields) =>{
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
            console.log("mod_1digit_stat")
    })
})

app.get('/mod_2digit_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_2digitmodifer", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_2digit_stat")
    })
})

app.get('/mod_total_char_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM statistic.icd10_subcategory_stat_modifieronly_byalpha;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_total_char_stat")
    })
})

app.get('/mod_code_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_modifieronly", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_code_stat")
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

app.get('/all_subcat_stat',(req,res) =>{
    conn_stat.query("SELECT distinct claml_code, chapter, count(distinct(claml_code)) COUNT FROM statistic.`icd10_subcategory_stat_all_raw2(4)` GROUP BY chapter HAVING count(chapter) >1 ORDER BY CASE WHEN chapter = 'CHAPTER XXII'THEN 0 END, claml_code ASC;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("all_subcat_stat")
    })
})

app.get('/3match_stat',(req,res) =>{
    conn_stat.query("SELECT *, count(WHO) COUNT FROM statistic.`icd10_thcc_pcu2(13)` WHERE WHO like 'exist' AND THCC like 'exist' AND PCU like 'exist' GROUP BY chapter HAVING COUNT(chapter) > 1 ORDER BY CASE WHEN chapter = 'CHAPTER XXII' THEN 0 END,code ASC;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("3match_stat")
    })
})
app.get('/icd10_keyPhrase_stat',(req,res) =>{
    conn_stat.query("SELECT *, count(chapter) COUNT FROM statistic.`icd10_keyphase_stat_raw(8)` GROUP BY chapter HAVING COUNT(chapter) > 0 ORDER BY keyPhraseId ASC;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("icd10_keyPhrase_stat")
    })
})
app.get('/keyWord_keyPhrase_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM statistic.stat_keyword_and_keyphrase;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("keyWord_keyPhrase_stat")
    })
})

