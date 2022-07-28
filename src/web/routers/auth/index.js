const koaRouter = require("koa-router");
const router = new koaRouter();

const eventos = require("../../../events/nodejs")


router.get("/auth/login", async(ctx) => {

    let jwt = ctx.cookies.get('3@mente-microaitec')

    ctx.request.header.authorization = jwt

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
        try {
            const { id, isAdmin = false } = await strapi.plugins[
                'users-permissions'
            ].services.jwt.getToken(ctx);
        } catch (error) {

        }

    } else {

    }

    eventos.emit('scream', { strapi });
    await ctx.render('auth/index', { error: { status: 400, message: "eeeeeee" } });
});


router.get("/auth/forgot_password", async(ctx) => {

    let jwt = ctx.cookies.get('3@mente-microaitec')

    ctx.request.header.authorization = jwt

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
        try {
            const { id, isAdmin = false } = await strapi.plugins[
                'users-permissions'
            ].services.jwt.getToken(ctx);
        } catch (error) {

        }

    } else {

    }

    eventos.emit('scream', { strapi });
    await ctx.render('auth/forgot', { error: { status: 401, message: "eeeeeee" } });
});


router.get("/auth/forgot_password_send", async(ctx) => {

    let jwt = ctx.cookies.get('3@mente-microaitec')

    ctx.request.header.authorization = jwt

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
        try {
            const { id, isAdmin = false } = await strapi.plugins[
                'users-permissions'
            ].services.jwt.getToken(ctx);
        } catch (error) {

        }

    } else {

    }

    eventos.emit('scream', { strapi });
    await ctx.render('auth/forgot_send', { error: { status: 401, message: "eeeeeee" } });
});


router.get("/auth/new_password", async(ctx) => {

    console.log(ctx.request.URL.origin)

    let { code } = ctx.request.query

    if (!code) {
        code = ""
    }

    let jwt = ctx.cookies.get('3@mente-microaitec')

    ctx.request.header.authorization = jwt

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
        try {
            const { id, isAdmin = false } = await strapi.plugins[
                'users-permissions'
            ].services.jwt.getToken(ctx);
        } catch (error) {

        }

    } else {

    }

    //eventos.emit('scream',{strapi});
    await ctx.render('auth/newpassword', { error: { status: 401, message: "eeeeeee" }, code });
});


module.exports = router;
