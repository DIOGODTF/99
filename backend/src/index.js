import express from 'express';
import cors from 'cors';
import db from './config/db.js';

const app = express();

//middlare do cors
app.use(cors());
//middlare do json
app.use(express.json());

/* 
   GET - retorna dados
   POST - Cadastrar dados
   PUT - Editar dados
   PATCH - Editar dados
   DELETE - excluir dados
*/
app.get('/status', function(request, response ){
    let d = new Date; 
    d = `${('00'+d.getDate()).slice(-2)}/${('00'+d.getMonth()).slice(-2)}/${('0000'+d.getFullYear()).slice(-2)}`;
    return response           
           .status(200)
           .send(`{"error":"","message":"Server started Ok!","date":"${d}"}`);           
})

app.get('/usuarios', function( request, response){
    let ssql = 'select * from usuario';
    db.query(ssql, function( err, result){
        if (err) {
            return response.status(500).send(err);
        } else {
            /*devolve um array de json
            */
            return response.status(200).json(result);
        }
    });    
} );

app.get('/usuarios/:id', function( request, response){
    let ssql = 'select * from usuario where id_usuario = ?';
    db.query(ssql,[request.params.id], function( err, result){
        if (err) {
            return response.status(500).send(err);
        } else {
            /*devolve um unico objeto json 
            */
            return response.status(result.length > 0 ? 200 : 404).json(result[0]); 
        }
    });    
} );

app.post('/usuarios/login', function (request, response){
    let ssql ="select id_usuario, nome, email, endereco, bairro, cidade, uf, cep, ";
        ssql+="date_format(dt_cadastro,'%d/%m/%Y %H:%i:%s' ) as dt_cadastro ";
        ssql+="from usuario where email = ? and senha = ?";

    db.query(ssql, [request.body.email, request.body.senha], function(err, result){
        if (err) {
            return response.status(500).send(err);
        } else {
            return response.status(result.length>0 ? 200 : 401).json(result[0]);
        }   
    });
});

app.post('/usuarios/cadastro',function(request, response){

});

app.put('/usuarios/:id',function(request, response){    
    let ssql = "update usuario set nome = ?, endereco = ?, bairro = ?, cidade = ?, uf = ?, cep = ? "
        ssql+= "where id_usuario = "+request.params.id;
    const body = request.body;    
    db.query(ssql,[body.nome,
                   body.endereco, 
                   body.bairro, 
                   body.cidade, 
                   body.uf, 
                   body.cep],
                   function(err, result){
                        if (err) {
                            return response.status(500).send(err);
                        } else {
                            return response.status(result.length>0?200:401).json(result[0]);
                        }
                   }
            );    
});

app.delete('/usuarios/:id',function(request, response){
    let ssql = 'delete from usuario where id_usuario = ?';
    db.query(ssql,[request.params.id], function(err, result){
        if (err) {
            return response.status(500).send(err);
        } else {
            return response.status(result.length>0 ? 200 : 401).json(result[0]);
        }
    });
});

/*
//uri params (/clientes/10)
app.get('/clientes/:id', function( request, response){
    return response.send('get do cliente '+request.params.id);
} )

app.get('/clientes/:id', function( request, response){
    return response.send('get do cliente '+request.params.id);
} )


// {"nome":"teste"}

app.post('/clientes', function( request, response){
    const body = request.body;
    return response.send('gravando o cliente '+body.nome);
} )
*/

app.listen(3000, function() {
   console.log('..:: servidor no ar ::..');
})

