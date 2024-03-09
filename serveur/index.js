const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql")
const dotenv = require("dotenv")

dotenv.config({
    path: '../.env'
})

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})


app.use(express.json())

app.use(cors())

app.get("/products", (req, res) => {

    const q = "SELECT * FROM products";

    db.query(q, (err, data) => {
        console.log(err, data);
        if(err) return res.json({ 
            error: err.sqlMessage 
        })
        else return res.json({
            data
        })
    });

});

app.post("/products", (req, res) => {
    const q = "INSERT INTO products (productsTitle, productsDescription, productsPrice, availableQuantity, productsImage) VALUES (?)";

    const values = [
        ...Object.values(req.body)
    ];

    console.log(values);

    db.query(q, [values], (err, data) => {
        console.log(err, data);
        if(err) return res.json({
            error: err.sqlMessage
        })
        else return res.json({
            data
        })
    });

});

app.get("/products/:idproducts", (req, res) => {

    const id = req.params.idproducts;

    const q = "SELECT * FROM products WHERE idproducts = ?";

    db.query(q, [id], (err, data) => {
        console.log(err, data);
        if(err) return res.json({
            error: err.sqlMessage
        })
        else return res.json({
            data
        })
    });

});

app.put("/products/:idproducts", (req, res) => {

    const id = req.params.idproducts;

    console.log(req.body);

    const data = req.body;

    const q = "UPDATE products SET" + Object.keys(data).map((k) => `${k} = ?`).join(",") + " WHERE idproducts = '" + id + "'";

    console.log(q);

    db.query(q, [
        ...Object.values(data)
    ], (err, out) => {

        console.log(err, out);

        if(err) return res.json({
            error: err.message
        })
        else return res.json({
            data: out
        })

    });

});

app.delete("/products/:idproducts", (req, res) => {

    const id = req.params.idproducts;

    console.log("Suppression de l'id : " + id, req.body);

    const { productsImage } = req.body;

    console.log(req.body);

    const q = `DELETE FROM products WHERE idproducts = ?`;
    
    db.query(q, [id], (err, data) => {
        console.log(err, data);
        if(err) return res.json({
            error: err.sqlMessage
        })
        else res.json({
            data
        })
    });

});

app.listen(process.env.URL, () => {
    console.log(`Connecté au port ${process.env.URL}`)
})