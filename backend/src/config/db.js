import mysql from 'mysql';

//conecta banco
const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"",
    database:"meu_mercado"
});

export default db;

/** se tiver problema pra acessar o mysql
 * ALLTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';
 * flush privileges;
 *
 * 
 * PRA RESOLVER PROBLEMAS DE RESTRICAO NO POWERSHEEL
 * Get-ExecutionPolicy
 * se for restrito, é so trocar
 * Set-ExecutionPolicy RemoteSigned
 */