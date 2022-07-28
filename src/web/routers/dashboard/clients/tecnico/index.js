const koaRouter = require("koa-router");
const { jwt_app } = require("../../../../../api/auth/services/userAuthJWT");
const router = new koaRouter({
    'prefix': '/tecnico'
});

const _3mente = require('./../service')

router.get("/", async(ctx) => {
    await ctx.render('dashboard/clients/tecnico/utentes', { jwt: 'ddd' });
});


router.get("/utentes/:id", async(ctx) => {
    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)

    try {
        const { id: utente } = ctx.params;
        const { data } = await jwt_app(jwt)
        if (data.role != 'tecnico') ctx.redirect('/auth/login');
        const user = await _3mente.menteUtenteTecnico(data.id, utente)
        await ctx.render('dashboard/clients/tecnico/utente_perfil', { user });
    } catch (e) {
        //ctx.redirect('/3mente/utentes')
        console.log(error)
    }


    //console.log(user)


});

router.get("/alertas", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)



    try {
        const { data } = await jwt_app(jwt)
        console.log(data, 'role')
        if (data.role != 'tecnico') ctx.redirect('/auth/login');

        const user = await _3mente.menteAlertaTecnico(data.id)
        let data1 = new Date()

        await ctx.render('dashboard/clients/tecnico/alertas', { user, ano: data1.getFullYear() });

    } catch (error) {
        // ctx.redirect('/auth/login')
        console.log(error)
    }
    // console.log(user)


});

router.get("/relatorios", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
    try {
        const { data } = await jwt_app(jwt)
        console.log(data, 'role')
        if (data.role != 'tecnico') ctx.redirect('/auth/login');
        const user = await _3mente.menteRelatorioTecnico(data.id)
        let data1 = new Date()
        await ctx.render('dashboard/clients/tecnico/relatorio', { user, ano: data1.getFullYear() });

    } catch (error) {


        console.log(error)
            // ctx.redirect('/auth/login')
    }



});



router.get("/live", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)

    try {
        const { data } = await jwt_app(jwt)
        console.log(data)
        if (data.role != 'tecnico') ctx.redirect('/auth/login');
        const user = await _3mente.menteMonitorizacaoTecnico(data.id)
        await ctx.render('dashboard/clients/tecnico/live', { user, jwt });

    } catch (error) {
        ctx.redirect('/auth/login')
        console.log(error)
    }



});



router.get("/perfil", async(ctx) => {
    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
    try {
        const { data } = await jwt_app(jwt)
        console.log(data, 'role')
        if (data.role != 'tecnico') ctx.redirect('/auth/login');
        const user = await _3mente.mentePerfilTecnico(data.id)

        console.log(user)
        await ctx.render('dashboard/clients/tecnico/perfil', { user });

    } catch (error) {
        //ctx.redirect('/auth/login')
        console.log(error)
    }


});

module.exports = router;