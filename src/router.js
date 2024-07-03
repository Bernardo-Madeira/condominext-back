const express = require('express')

// CONTROLLERS
const usuarioController = require('./controllers/usuarioController')
const servicoController = require('./controllers/servicoController')
const pedidoController = require('./controllers/pedidoController')
const avaliacaoController = require('./controllers/avaliacaoController')
const administradorController = require('./controllers/administradorController')
const geralController = require('./controllers/geralController')
const moradorController = require('./controllers/moradorController')
const prestadorController = require('./controllers/prestadorController')

const router = express.Router()

// USUÁRIO
router.get('/usuario/index', usuarioController.index)
router.get('/usuario/show/:UsuarioID', usuarioController.show)
router.post('/usuario/store', usuarioController.store)
router.post('/usuario/update', usuarioController.update)
router.post('/usuario/destroy', usuarioController.destroy)

// SERVIÇO
router.post('/servico/index', servicoController.index)
router.get('/servico/getAllServicos', servicoController.getAllServicos)
router.get('/servico/show/:ServicoID', servicoController.show)
router.post('/servico/store', servicoController.store)
router.post('/servico/update', servicoController.update)
router.post('/servico/destroy', servicoController.destroy)

// PEDIDO
router.post('/pedido/index', pedidoController.index)
router.get('/pedido/show/:PedidoID', pedidoController.show)
router.post('/pedido/store', pedidoController.store)
router.post('/pedido/update', pedidoController.update)
router.post('/pedido/destroy', pedidoController.destroy)
router.post('/pedido/prestador', pedidoController.prestador)

// AVALIAÇÃO
router.get('/avaliacao/index', avaliacaoController.index)
router.get('/avaliacao/show/:AvaliacaoID', avaliacaoController.show)
router.post('/avaliacao/store', avaliacaoController.store)
router.post('/avaliacao/destroy', avaliacaoController.destroy)

// ADMINISTRADOR
router.get('/administrador/index', administradorController.index)
router.get('/administrador/show/:AvaliacaoID', administradorController.show)
router.post('/administrador/update', administradorController.update)
router.post('/administrador/store', administradorController.store)
router.post('/administrador/destroy', administradorController.destroy)

// MORADOR
router.get('/morador/index', moradorController.index)
router.get('/morador/show/:AvaliacaoID', moradorController.show)
router.post('/morador/update', moradorController.update)
router.post('/morador/store', moradorController.store)
router.post('/morador/destroy', moradorController.destroy)

// PRESTADOR
router.get('/prestador/index', prestadorController.index)
router.get('/prestador/show/:AvaliacaoID', prestadorController.show)
router.post('/prestador/update', prestadorController.update)
router.post('/prestador/store', prestadorController.store)
router.post('/prestador/destroy', prestadorController.destroy)
router.get('/prestador/solicitacoes', prestadorController.solicitacoes)
router.get('/prestador/getPedidos/:PrestadorID', prestadorController.getPedidos)

// GERAL
router.post('/login', geralController.login)



module.exports = router
