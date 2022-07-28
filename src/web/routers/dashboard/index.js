const koaRouter = require("koa-router");
const router = new koaRouter({
    prefix: '/instituicao'
});


const router_tecnico = require('./clients/tecnico')
const router_clients = require('./clients')
const router_admin = require('./admin')
router.use(router_clients.routes()).use(router_clients.allowedMethods());
router.use(router_admin.routes()).use(router_admin.allowedMethods());
router.use(router_tecnico.routes()).use(router_tecnico.allowedMethods());



module.exports = router;