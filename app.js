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

app.get('/tot_new_block_table',(req,res) =>{
    conn_stat.query("SELECT * FROM (SELECT *, IFNULL(CHAPTER, '') AS chap, Format(SUM(total),0) AS tot,Format(SUM(verified),0) AS verify, FromRoman(CHAPTER) Roman FROM statistic.block_stat_new WHERE CHAPTER is not null GROUP BY CHAPTER WITH ROLLUP) res order by CASE WHEN chap like '' THEN 0 END, res.Roman;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("tot_new_block_table")
    })
})

app.get('/new_cat_stat',(req,res) =>{
    conn_stat.query("SELECT *, thai_term term_thai, format(total, 0) tot, format(verified,0) verify, format(thai_term, 0) th ,fromRoman(CHAPTER) Roman FROM statistic.category_stat_new order by Roman;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("new_cat_stat")
    })
})
app.get('/tot_cat_table_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM(SELECT *, Thai_term term_thai, IFNULL(chapter, '') AS chap, Format(SUM(total),0) AS tot,Format(SUM(verified),0) AS verify, Format(SUM(Thai_term),0) AS Th, Format(SUM(thai_term),0) AS thai,fromRoman(chapter) Roman FROM statistic.category_stat_new WHERE chapter is not null GROUP BY chapter WITH ROLLUP) res order by CASE WHEN chap = '' THEN 0 end, res.Roman ASC;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("tot_cat_table_stat")
    })
})
app.get('/new_subCat_stat',(req,res) =>{
    conn_stat.query("SELECT *,thai_term term_thai, format(total, 0) tot, format(verified,0) verify, format(thai_term, 0) th ,fromRoman(CHAPTER) Roman FROM statistic.sub_category_stat_new order by Roman;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("new_subCat_stat")
    })
})

app.get('/mod_1digit_chap_stat',(req,res) =>{
    conn_stat.query("SELECT *, format(total, 0) tot FROM statistic.icd10_subcategory_stat_1digitmodifer_bychapter;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_1digit_chap_stat")
    })
})

app.get('/mod_2digit_chap_stat',(req,res) =>{
    conn_stat.query("SELECT *, format(total, 0) tot FROM statistic.icd10_subcategory_stat_2digitmodifer_bychapter;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_2digit_chap_stat")
    })
})

app.get('/mod_total_chap_stat',(req,res) =>{
    conn_stat.query("SELECT *, format(total, 0) tot, fromRoman(chapter) Roman FROM statistic.icd10_subcategory_stat_modifieronly_bychapter ORDER BY Roman;", (err,rows,fields) =>{
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

app.get('/tot_old_block_table_stat',(req,res) =>{
    conn_stat.query("SELECT *, IFNULL(alpha, '') AS chap, Format(SUM(total),0) AS tot,Format(SUM(verified),0) AS verify FROM statistic.block_stat_new_alpha WHERE alpha is not null GROUP BY alpha WITH ROLLUP;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("tot_old_block_table_stat")
    })
})

app.get('/category_stat',(req,res) =>{
    conn_stat.query("SELECT *, thai_term term_thai, format(total, 0) tot, format(verified,0) verify, format(thai_term, 0) th FROM category_stat_new_alpha order by alpha;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("category_stat")
    })
})
app.get('/tot_old_cat_table_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM(SELECT *, Thai_term term_thai, IFNULL(alpha, '') AS cha, Format(SUM(total),0) AS tot,Format(SUM(verified),0) AS verify, Format(SUM(Thai_term),0) AS Th, Format(SUM(Thai_term),0) AS thai FROM category_stat_new_alpha WHERE alpha is not null GROUP BY alpha WITH ROLLUP) res order by CASE WHEN res.cha = '' THEN 0 end, res.cha ASC;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("tot_old_cat_table_stat")   
    })
})


// app.get('/codeType_stat',(req,res) =>{
//     conn_stat.query("SELECT * FROM claml_codekind_all", (err,rows,fields) =>{
//         console.log("fetch.....")
//         if (err) throw err;
//             res.json(rows)
//             console.log("category_stat")
//     })
// })

// app.get('/codeType_chap_stat',(req,res) =>{
//     conn_stat.query("SELECT * FROM claml_codekind_bychapter", (err,rows,fields) =>{
//         console.log("fetch.....")
//         if (err) throw err;
//             res.json(rows)
//             console.log("category_stat")
//     })
// })

// app.get('/subCat_stat',(req,res) =>{
//     conn_stat.query("SELECT * FROM claml_subcategory_stat_all", (err,rows,fields) =>{
//         console.log("fetch.....")
//         if (err) throw err;
//             res.json(rows)
//             console.log("category_stat")
//     })
// })

app.get('/mod_1digit_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM claml_subcategory_stat_1digitmodifer", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_1digit_stat")
    })
})

app.get('/mod_2digit_stat',(req,res) =>{
    conn_stat.query("SELECT *, format(count,0) tot FROM claml_subcategory_stat_2digitmodifer", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_2digit_stat")
    })
})

app.get('/mod_total_char_stat',(req,res) =>{
    conn_stat.query("SELECT *, format(total,0) tot FROM statistic.icd10_subcategory_stat_modifieronly_byalpha;", (err,rows,fields) =>{
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
    conn_stat.query("SELECT alpha, ICD10_WHO_subcat total, ICD10_WHO_verified_subcat, ICD10_TM_subcate thai_term, ICD10_WHO_haveThaiTerm term_thai, format(ICD10_WHO_subcat, 0) tot, format(ICD10_WHO_verified_subcat,0) verify, format(ICD10_TM_subcate, 0) th, format(ICD10_WHO_haveThaiTerm, 0) thai FROM statistic.all_subcategory_stat_alpha order by alpha;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("code_stat")
    })
})


app.get('/tot_old_subcat_table_stat',(req,res) =>{
    conn_stat.query("SELECT alpha, ICD10_WHO_subcat total, ICD10_WHO_verified_subcat verified, ICD10_TM_subcate thai_term, ICD10_WHO_haveThaiTerm term_thai, IFNULL(alpha, '') AS chap, Format(SUM(ICD10_WHO_subcat),0) AS tot,Format(SUM(ICD10_WHO_verified_subcat),0) AS verify, Format(SUM(ICD10_TM_subcate),0) AS Th, Format(SUM(ICD10_WHO_haveThaiTerm),0) AS thai FROM statistic.all_subcategory_stat_alpha WHERE alpha is not null GROUP BY alpha WITH ROLLUP;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("tot_old_subcat_table_stat")
    })
})

// app.get('/mesh_stat',(req,res) =>{
//     conn_stat.query("SELECT * FROM mesh_stat;", (err,rows,fields) =>{
//         console.log("fetch.....")
//         if (err) throw err;
//             res.json(rows)
//             console.log("category_stat")
//     })
// })

app.get('/icd10_tm_pcu_stat',(req,res) =>{
    conn_stat.query("SELECT *, FORMAT(WHO, 0) who, FORMAT(THCC, 0) thcc, FORMAT(PCU, 0) pcu FROM `number_of_icd10_tm_pcu(14)`;", (err,rows,fields) =>{
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
    conn_stat.query("SELECT *, FORMAT(count(chapter), 0) total, count(WHO) COUNT FROM statistic.`icd10_thcc_pcu2(13)` WHERE WHO like 'exist' AND THCC like 'exist' AND PCU like 'exist' GROUP BY chapter HAVING COUNT(chapter) > 1 ORDER BY CASE WHEN chapter = 'CHAPTER XXII' THEN 0 END,code ASC;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("3match_stat")
    })
})
app.get('/icd10_keyPhrase_stat',(req,res) =>{
    conn_stat.query("SELECT *, FORMAT(count(chapter), 0) total , count(chapter) COUNT FROM statistic.`icd10_keyphase_stat_raw(8)` GROUP BY chapter HAVING COUNT(chapter) > 0 ORDER BY keyPhraseId ASC;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("icd10_keyPhrase_stat")
    })
})
app.get('/keyWord_keyPhrase_stat',(req,res) =>{
    conn_stat.query("SELECT *, FORMAT(Number_of_KeyWord, 0) keyword, FORMAT(Number_of_KeyPhrase, 0) keyphrase FROM statistic.stat_keyword_and_keyphrase;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("keyWord_keyPhrase_stat")
    })
})

app.get('/tot_subcat_table_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM(SELECT *, Thai_term term_thai, IFNULL(chapter, '') AS chap, Format(SUM(total),0) AS tot,Format(SUM(verified),0) AS verify, Format(SUM(Thai_term),0) AS Th, Format(SUM(thai_term),0) AS thai,fromRoman(chapter) Roman FROM statistic.sub_category_stat_new WHERE chapter is not null GROUP BY chapter WITH ROLLUP) res order by CASE WHEN chap = '' THEN 0 end, res.Roman ASC;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("tot_subcat_table_stat")
    })
})

app.get('/normal_character',(req,res) =>{
    conn_stat.query("SELECT chapter, alpha, sum(number) number, FromRoman(chapter) Roman FROM statistic.icd10_subcategory_stat_normalonly group by alpha;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("normal_character")
    })
})

app.get('/normal_chapter',(req,res) =>{
    conn_stat.query("SELECT chapter, alpha, sum(number) number, FromRoman(chapter) Roman FROM statistic.icd10_subcategory_stat_normalonly group by chapter;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("normal_chapter")
    })
})

app.get('/synonym_useful',(req,res) =>{
    conn_stat.query("SELECT  distinct *, count(code) total, format(count(code), 0) number FROM statistic.snomed_synonym_raw WHERE distance >2 GROUP BY alpha ORDER BY alpha;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("synonym_useful")
    })
})
app.get('/synonym_useful_table',(req,res) =>{
    conn_stat.query("SELECT alpha, code, icd10Term, snomed_term, total, number FROM (SELECT distinct *, IFNULL(alpha, '') cha, count(code) total, format(count(code), 0) number FROM statistic.snomed_synonym_raw WHERE distance >2 AND alpha is not null GROUP BY alpha WITH ROLLUP) res GROUP BY res.alpha ORDER BY CASE WHEN alpha is null then 0 end, alpha asc;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("synonym_useful_table")
    })
})
app.get('/synonym_useful_chapter',(req,res) =>{
    conn_stat.query("SELECT  distinct *, count(code) total, format(count(code), 0) number, FromRoman(CHAPTER) Roman FROM statistic.snomed_synonym_raw WHERE distance >2 GROUP BY CHAPTER ORDER BY Roman;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("synonym_useful_chapter")
    })
})
app.get('/synonym_useful_chapter_table',(req,res) =>{
    conn_stat.query("SELECT CHAPTER, code, icd10Term, snomed_term, total, number FROM (SELECT distinct *, IFNULL(CHAPTER, '') cha, count(code) total, format(count(code), 0) number, FromRoman(CHAPTER) Roman FROM statistic.snomed_synonym_raw WHERE distance >2 AND CHAPTER is not null GROUP BY CHAPTER WITH ROLLUP) res GROUP BY res.CHAPTER ORDER BY CASE WHEN CHAPTER is null then 0 end, Roman asc;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("synonym_useful_chapter_table")
    })
})

app.get('/three_keyword_stat',(req,res) =>{
    conn_stat.query("SELECT * FROM statistic.keywordstat;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("three_keyword_stat")
    })
})
app.get('/error_subcat_icd10_stat',(req,res) =>{
    conn_stat.query("SELECT chapter, (preferred_name + inclusion + exclusion + codinghint + `definition` + footnote + note + modifierlink + star + draggers) as summation FROM( SELECT     chapter, SUM(`code` NOT LIKE '') code, SUM(`preferred-name` NOT LIKE '') preferred_name, SUM(inclusion NOT LIKE '') inclusion, SUM(exclusion NOT LIKE '') exclusion, SUM(codinghint NOT LIKE '') codinghint, SUM(`definition` NOT LIKE '') `definition`, SUM(footnote NOT LIKE '') footnote, SUM(note NOT LIKE '') note, SUM(modifierlink NOT LIKE '') modifierlink, SUM(star NOT LIKE '') star, SUM(draggers NOT LIKE '') draggers, FromRoman(     chapter) Roman FROM statistic.icd10_sub_category_errorreport GROUP BY chapter ORDER BY Roman) res;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("error_subcat_icd10_stat")
    })
})
app.get('/error_subcat_icd10_table_stat',(req,res) =>{
    conn_stat.query("SELECT chapter, (preferred_name + inclusion + exclusion + codinghint + `definition` + footnote + note + modifierlink + star + draggers) as summation FROM( SELECT chapter, SUM(`code` NOT LIKE '') code, SUM(`preferred-name` NOT LIKE '') preferred_name, SUM(inclusion NOT LIKE '') inclusion, SUM(exclusion NOT LIKE '') exclusion, SUM(codinghint NOT LIKE '') codinghint, SUM(`definition` NOT LIKE '') `definition`, SUM(footnote NOT LIKE '') footnote, SUM(note NOT LIKE '') note, SUM(modifierlink NOT LIKE '') modifierlink, SUM(star NOT LIKE '') star, SUM(draggers NOT LIKE '') draggers, FromRoman(chapter) Roman FROM statistic.icd10_category_errorreport GROUP BY chapter ORDER BY Roman) res;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("error_subcat_icd10_table_stat")
    })
})
app.get('/error_cat_icd10_stat',(req,res) =>{
    conn_stat.query("SELECT chapter, (preferred_name + inclusion + exclusion + codinghint + `definition` + footnote + note + modifierlink + star + draggers) as summation FROM( SELECT chapter, SUM(`code` NOT LIKE '') code, SUM(`preferred-name` NOT LIKE '') preferred_name, SUM(inclusion NOT LIKE '') inclusion, SUM(exclusion NOT LIKE '') exclusion, SUM(codinghint NOT LIKE '') codinghint, SUM(`definition` NOT LIKE '') `definition`, SUM(footnote NOT LIKE '') footnote, SUM(note NOT LIKE '') note, SUM(modifierlink NOT LIKE '') modifierlink, SUM(star NOT LIKE '') star, SUM(draggers NOT LIKE '') draggers, FromRoman(chapter) Roman FROM statistic.icd10_category_errorreport GROUP BY chapter ORDER BY Roman) res;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("error_cat_icd10_stat")
    })
})
app.get('/error_cat_icd10_table_stat',(req,res) =>{
    conn_stat.query("SELECT chapter, (preferred_name + inclusion + exclusion + codinghint + `definition` + footnote + note + modifierlink + star + draggers) as summation FROM( SELECT chapter, SUM(`code` NOT LIKE '') code, SUM(`preferred-name` NOT LIKE '') preferred_name, SUM(inclusion NOT LIKE '') inclusion, SUM(exclusion NOT LIKE '') exclusion, SUM(codinghint NOT LIKE '') codinghint, SUM(`definition` NOT LIKE '') `definition`, SUM(footnote NOT LIKE '') footnote, SUM(note NOT LIKE '') note, SUM(modifierlink NOT LIKE '') modifierlink, SUM(star NOT LIKE '') star, SUM(draggers NOT LIKE '') draggers, FromRoman(chapter) Roman FROM statistic.icd10_category_errorreport GROUP BY chapter ORDER BY Roman) res;", (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("error_cat_icd10_table_stat")
    })
})


















//table

app.get('/table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT distinct claml_code, chapter, claml_subcategory_label, thai_term, FromRoman(chapter) Roman FROM statistic.`icd10_subcategory_stat_all_raw2(4)` WHERE chapter = ? order by Roman;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("tot_subcat_table_stat")
    })
})

app.get('/chapter_cat_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT distinct category, chapter, claml_category_label, category_thai_term, FromRoman(chapter) Roman FROM statistic.`icd10_category_stat_raw2(10)` WHERE chapter = ? order by Roman;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("tot_subcat_table_stat")
    })
})

app.get('/mod1_chapter_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT distinct modifier_code, CHAPTER, label, fromRoman(CHAPTER) Roman FROM statistic.`icd10_subcategory_stat_1digitmodifer_raw2(6)` WHERE CHAPTER = ? ORDER BY Roman;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod1_chapter_table")
    })
})

app.get('/mod2_chapter_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT distinct modifier_code, CHAPTER, label, fromRoman(CHAPTER) Roman FROM statistic.`icd10_subcategory_stat_2digitmodifer_raw2(7)` WHERE CHAPTER = ? ORDER BY Roman;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod2_chapter_table")
    })
})

app.get('/mod_total_chapter_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT distinct modifier_code, CHAPTER, label, fromRoman(CHAPTER) Roman FROM statistic.`icd10_subcategory_stat_modifieronly_raw3(1)` WHERE CHAPTER = ? ORDER BY Roman;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_total_chapter_table")
    })
})

app.get('/3match_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT *, FromRoman(chapter) Roman FROM statistic.`icd10_thcc_pcu2(13)` WHERE CHAPTER = ? AND WHO like 'exist' AND THCC like 'exist' AND PCU like 'exist' GROUP BY code  ORDER BY Roman;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("3match_table   ")
    })
})

app.get('/mod_total_character_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT * FROM statistic.icd10_subcategory_stat_all_raw_alpha WHERE length(claml_code) > 5 AND alpha = ? ORDER BY alpha;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("mod_total_character_table")
    })
})

app.get('/keyphrase_icd10_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT Chapter, claml_code, keyPhrase, sub_category_thai_term, FromRoman(Chapter) Roman FROM statistic.`icd10_keyphase_stat_raw(8)` WHERE Chapter is not null AND Chapter = ? ORDER BY Roman;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("keyphrase_icd10_table")
    })
})

app.get('/character_normal_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT * FROM statistic.icd10_subcategory_stat_all_raw_alpha WHERE length(claml_code) = 5 AND alpha = ? ORDER BY alpha;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("character_normal_table")
    })
})

app.get('/character_subcat_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT * FROM statistic.icd10_subcategory_stat_all_raw_alpha WHERE alpha = ? ORDER BY claml_code;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("character_subcat_table")
    })
})

app.get('/character_cat_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT * FROM statistic.icd10_category_stat_all_raw_alpha WHERE  ORDER BY category;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("character_cat_table")
    })
})
app.get('/chapter_normal_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT distinct claml_code, chapter, claml_subcategory_label, thai_term FROM statistic.`icd10_subcategory_stat_normalonly_raw2(2)` WHERE chapter = ? ORDER BY claml_code;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("chapter_normal_table")
    })
})

app.get('/useful_snomed_synonym_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT distinct * FROM statistic.snomed_synonym_raw WHERE distance >2 AND alpha = ? ORDER BY code;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("useful_snomed_synonym_table")
    })
})
app.get('/useful_snomed_synonym_chapter_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT distinct * FROM statistic.snomed_synonym_raw WHERE distance >2 AND CHAPTER = ? ORDER BY code;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("useful_snomed_synonym_chapter_table")
    })
})

app.get('/block_chapter_label_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT * FROM statistic.icd10_block_label WHERE CHAPTER = ?;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("block_chapter_label_table")
    })
})

app.get('/block_character_label_table/:chapter',(req,res) =>{
    let chapter = req.params.chapter;
    conn_stat.query("SELECT * FROM statistic.icd10_block_alpha WHERE alpha = ?;",chapter, (err,rows,fields) =>{
        console.log("fetch.....")
        if (err) throw err;
            res.json(rows)
            console.log("block_character_label_table")
    })
})




