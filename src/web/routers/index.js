const koaRouter = require("koa-router");
const router = new koaRouter();



const router_site = require('./site')

const router_dashboard = require('./dashboard')

const router_auth = require('./auth')

router.use(router_site.routes()).use(router_site.allowedMethods());
router.use(router_dashboard.routes()).use(router_dashboard.allowedMethods());
router.use(router_auth.routes()).use(router_auth.allowedMethods());



module.exports = router;