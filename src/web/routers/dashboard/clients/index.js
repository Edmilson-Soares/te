const koaRouter = require("koa-router");
const router = new koaRouter();
const _3mente = require('./service/index')

const { jwt_app } = require('../../../../api/auth/services/userAuthJWT')

router.get("/", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


    try {
        const { data } = await jwt_app(jwt)

        console.log(data, 'role')

        if (data.role == 'tecnico') return ctx.redirect('/instituicao/tecnico/relatorios');
        if (data.role != 'cliente') return ctx.redirect('/auth/login');

        const user = await _3mente.mente(data.id)

        console.log(user.intituicao_responsavel.utentes)

        let tempo = 0,
            desempenho = 0.0,
            utente_v = 0;


        user.intituicao_responsavel.utentes.map(utente => {
            tempo += Number(utente.f1.split(",")[3]) +
                Number(utente.f2.split(",")[3]) +
                Number(utente.f3.split(",")[3]) +
                Number(utente.f4.split(",")[3]) +
                Number(utente.f5.split(",")[3]) +
                Number(utente.f6.split(",")[3]) +
                Number(utente.f7.split(",")[3]) +
                Number(utente.f8.split(",")[3]) +
                Number(utente.f9.split(",")[3]) +
                Number(utente.f10.split(",")[3]) +
                Number(utente.f11.split(",")[3])




            desempenho += Number(utente.f.split(",")[11])

            utente_v++

        })

        if (utente_v > 0) {
            desempenho /= utente_v
        }

        console.log(tempo, desempenho)

        await ctx.render('dashboard/clients/index', { user, desempenho, tempo });


    } catch (error) {

        console.log(error)
            // ctx.redirect('/auth/login')
    }



});


router.get("/tecnicos", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
    try {
        const { data } = await jwt_app(jwt)
        if (data.role != 'cliente') ctx.redirect('/auth/login');
        const user = await _3mente.menteTecnico(data.id)
        await ctx.render('dashboard/clients/tecnicos', { user });

    } catch (error) {

        console.log(error)
            // ctx.redirect('/auth/login')
    }



});


router.get("/utentes", async(ctx) => {
    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


    try {

        const { data } = await jwt_app(jwt)
        if (data.role != 'cliente') ctx.redirect('/auth/login');


        // console.log(data, "jwt")
        const user = await _3mente.menteUtentes(data.id)
        let data1 = new Date()
        await ctx.render('dashboard/clients/utentes', { user, ano: data1.getFullYear(), jwt });

    } catch (error) {
        ctx.redirect('/auth/login')
    }

});


router.get("/utentes/:id", async(ctx) => {
    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)

    try {
        const { id: utente } = ctx.params;
        const { data } = await jwt_app(jwt)
        if (data.role != 'cliente') ctx.redirect('/auth/login');
        const user = await _3mente.menteUtente(data.id, utente)
        await ctx.render('dashboard/clients/utente_perfil', { user });
    } catch (e) {
        ctx.redirect('/3mente/utentes')
    }


    //console.log(user)


});



router.get("/perfil", async(ctx) => {
    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
    try {
        const { data } = await jwt_app(jwt)
        if (data.role != 'cliente') ctx.redirect('/auth/login');
        const user = await _3mente.mentePerfil(data.id)
        await ctx.render('dashboard/clients/perfil', { user });

    } catch (error) {
        ctx.redirect('/auth/login')
    }


});



router.get("/alertas", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)



    try {
        const { data } = await jwt_app(jwt)
        if (data.role != 'cliente') ctx.redirect('/auth/login');
        const user = await _3mente.menteAlerta(data.id)
        let data1 = new Date()

        await ctx.render('dashboard/clients/alertas', { user, ano: data1.getFullYear() });

    } catch (error) {
        ctx.redirect('/auth/login')
    }
    // console.log(user)


});


router.get("/arquivos", async(ctx) => {
    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)

    try {
        const { data } = await jwt_app(jwt)
        if (data.role != 'cliente') ctx.redirect('/auth/login');
        const user = await _3mente.menteArquivos(data.id)
        let data1 = new Date()
        console.log(user)
        await ctx.render('dashboard/clients/arquivos', { user, ano: data1.getFullYear() });

    } catch (error) {


        //console.log(error)
        ctx.redirect('/auth/login')
    }




});



router.get("/relatorios", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
    try {
        const { data } = await jwt_app(jwt)
        if (data.role != 'cliente') ctx.redirect('/auth/login');
        const user = await _3mente.menteRelatorio(data.id)
        let data1 = new Date()
        await ctx.render('dashboard/clients/relatorio', { user, ano: data1.getFullYear() });

    } catch (error) {


        //console.log(error)
        ctx.redirect('/auth/login')
    }



});


router.get("/live", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)

    try {
        const { data } = await jwt_app(jwt)
        if (data.role != 'cliente') ctx.redirect('/auth/login');
        const user = await _3mente.menteMonitorizacao(data.id)
        await ctx.render('dashboard/clients/live', { user, jwt });

    } catch (error) {
        ctx.redirect('/auth/login')
    }



});




////****************************** Api ******************************** ////





module.exports = router;