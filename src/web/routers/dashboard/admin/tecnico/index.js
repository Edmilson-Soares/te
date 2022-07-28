const koaRouter = require("koa-router");
const router = new koaRouter();

const eventos=require("../../../events/nodejs")


router.get("/", async (ctx) => {

  let jwt=ctx.cookies.get('microaitec')

  ctx.request.header.authorization=jwt

if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
  try {
    const { id, isAdmin = false } = await strapi.plugins[
      'users-permissions'
    ].services.jwt.getToken(ctx);
  } catch (error) {

  }

}else{

}

  eventos.emit('scream',{strapi});
  await ctx.render('site/index',{jwt});
});


module.exports = router;
