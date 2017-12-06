var MongoClient = require("mongodb").MongoClient;
require("dotenv").load();
const url = "" || process.env.DB_URL;
var base;

module.exports = {
    conectar() {
        MongoClient.connect(url, (err, db) => {
            if (err){
                return console.error(err);
            }
            console.log("Conexión exitosa a la base");
            base = db;
        });
    },
    get(){
        return base;
    }
}