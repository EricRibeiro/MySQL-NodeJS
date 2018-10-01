const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const mysql = require("mysql");

const app = express();
const jsonParser = bodyParser.json();

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs-mysql"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Conectado!");
});

app.get("/suppliers", function (req, res) {
    con.query("SELECT * FROM suppliers", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/suppliers/:sid", function (req, res) {
    let supplier_id = req.params.sid;
    let sql = "SELECT * FROM suppliers WHERE supplier_id = " + supplier_id;

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

app.post("/suppliers", jsonParser, function (req, res) {
let id = req.body.id;
    let name = req.body.name.toString();
    let city = req.body.city.toString();
    let state = req.body.state.toString();

    let sql = "INSERT INTO suppliers VALUES ("
            +  id     + ", " +
        "'" +  name   + "', " +
        "'" +  city   + "', " +
        "'" +  state  + "')"

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Uma entrada inserida.");
    });

    res.send("Persistido!");
});

app.put("/suppliers", jsonParser, function (req, res) {
    let id = req.body.id;
    let name = req.body.name.toString();
    let city = req.body.city.toString();
    let state = req.body.state.toString();

    let sql = "UPDATE suppliers SET "  +
        "supplier_name = '"    + name  + "', " +
        "city = '"             + city  + "', " +
        "state = '"            + state + "' "   +
        "WHERE supplier_id = " + id;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Uma entrada atualizada.");
    });

    res.send("Alterado!");
});

app.delete("/suppliers/:sid", jsonParser, function (req, res) {
    let id = req.params.sid;
   
    let sql = "DELETE FROM suppliers WHERE "  +
        "supplier_id = " + id;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Uma entrada apagada.");
    });

    res.send("Apagado!");
});