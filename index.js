//Express Config
const express = require("express")
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")))

//Database Config
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.database/data_source.db')
let fs = require('fs')

//Paths
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/:search.:gender.:roll_class.:house.:filter.:sort", (req, res) => {

    let search = req.params.search
    let gender = req.params.gender
    let roll_class = req.params.roll_class
    let house = req.params.house
    let filter = req.params.filter
    let sort = req.params.sort

    let myQuery = " SELECT * FROM STUDENTS "
    let count = 0
    if (search != "null") {
        if(count == 0){
            myQuery += ` WHERE (first_name LIKE '%${search}%' OR last_name LIKE '%${search}%' OR srn = '${search}') `
        } else {
            myQuery += ` AND (first_name LIKE '%${search}%' OR last_name LIKE '%${search}%' OR srn = '${search}') `
        }
        count++
    }
    if (gender != "null") {
        if(count == 0){
            myQuery += ` WHERE (gender = '${gender == "Male" ? "M" : "F"}') `
        } else {
            myQuery += ` AND (gender = '${gender == "Male" ? "M" : "F"}') `
        }
        count++
    }
    if (roll_class != "null") {
        if(count == 0){
            myQuery += ` WHERE (roll_class = '${roll_class.split("_").join(".")}') `
        } else {
            myQuery += ` AND (roll_class = '${roll_class.split("_").join(".")}') `
        }
        count++
    }
    if (house != "null") {
        if(count == 0){
            myQuery += ` WHERE (house = '${house}') `
        } else {
            myQuery += ` AND (house = '${house}') `
        }
        count++
    }
    myQuery += ` ORDER BY ${filter} ${sort} `

    console.log(myQuery + '\n')

    db.all(myQuery, (err, rows) => {
        if (err) {
            console.log(err)
        }
        fs.writeFileSync("public/data.json", JSON.stringify(rows, null, 4))
    })

    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/help", (req, res) => {
    res.sendFile(path.join(__dirname, "public/help.html"))
})
//Host
app.listen(5000, () => {
    console.log("Server is running, visit http://localhost:5000/ to access your website")
})