const express = require('express')

// CONTROLLERS
const usuarioController = require('./controllers/usuarioController')
const servicoController = require('./controllers/servicoController')
const pedidoController = require('./controllers/pedidoController')
const avaliacaoController = require('./controllers/avaliacaoController')

const router = express.Router()

// USUÁRIO
router.get('/usuario/index', usuarioController.index)
router.get('/usuario/show/:UsuarioID', usuarioController.show)
router.post('/usuario/store', usuarioController.store)
router.post('/usuario/update', usuarioController.update)
router.post('/usuario/destroy', usuarioController.destroy)
router.post('/usuario/login', usuarioController.loginUsuario)

// SERVIÇO
router.get('/servico/index', servicoController.index)
router.get('/servico/show/:ServicoID', servicoController.show)
router.post('/servico/store', servicoController.store)
router.post('/servico/update', servicoController.update)
router.post('/servico/destroy', servicoController.destroy)

// PEDIDO
router.get('/pedido/index', pedidoController.index)
router.get('/pedido/show/:PedidoID', pedidoController.show)
router.post('/pedido/store', pedidoController.store)
router.post('/pedido/update', pedidoController.update)
router.post('/pedido/destroy', pedidoController.destroy)

// AVALIAÇÃO
router.get('/avaliacao/index', avaliacaoController.index)
router.get('/avaliacao/show/:AvaliacaoID', avaliacaoController.show)
router.post('/avaliacao/store', avaliacaoController.store)
router.post('/avaliacao/destroy', avaliacaoController.destroy)



module.exports = router
