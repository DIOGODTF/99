import mysql from 'mysql';

//conecta banco
const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"root",
    database:"meu_mercado"
});

export default db;
