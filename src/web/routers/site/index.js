const koaRouter = require("koa-router");
const { jwt_app } = require("../../../api/auth/services/userAuthJWT");
const router = new koaRouter();

const eventos = require("../../../events/nodejs")


router.get("/", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)

    try {
        const { data } = await jwt_app(jwt)

        console.log(data, jwt)


        await ctx.render('site/index', { data });
    } catch (error) {
        await ctx.render('site/index', { data: null });
    }

});


router.get("/sobre", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)

    try {
        const { data } = await jwt_app(jwt)

        console.log(data, jwt)


        await ctx.render('site/sobre', { data });
    } catch (error) {
        await ctx.render('site/sobre', { data: null });
    }

});



router.get("/sobre/programas", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)

    try {
        const { data } = await jwt_app(jwt)

        console.log(data, jwt)


        await ctx.render('site/sobre', { data });
    } catch (error) {
        await ctx.render('site/sobre', { data: null });
    }

});


router.get("/servicos", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)

    try {
        const { data } = await jwt_app(jwt)

        console.log(data, jwt)


        await ctx.render('site/servicos', { data });
    } catch (error) {
        await ctx.render('site/servicos', { data: null });
    }

});


module.exports = router;
