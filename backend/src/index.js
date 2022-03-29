import express from 'express';
import cors from 'cors';
import controllerUsuarios from './controllers/controller.usuarios.js';
import controllerMercados from './controllers/controller.mercados.js';
import controllerProdutos from './controllers/controller.produtos.js';
import controllerPedidos from './controllers/controller.pedidos.js';

const app = express();

//middlare do cors
app.use(cors());
//middlare do json
app.use(express.json());

app.use( controllerUsuarios );
app.use( controllerMercados );
app.use( controllerProdutos );
app.use( controllerPedidos );
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


