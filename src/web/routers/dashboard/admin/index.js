const koaRouter = require("koa-router");
const router = new koaRouter({
    prefix: '/admin'
});
const _3mente = require('./service/index')

const { jwt_app } = require('./../../../../api/auth/services/userAuthJWT')

router.get("/", async(ctx) => {

    let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


    try {



        const instituicoes = await strapi.query('api::intituicao.intituicao').findMany({

                populate: {
                    responsaveis: {
                        select: ['nome', 'descricao', 'morada', 'contacto'],
                        populate: {
                            'foto': {
                                select: ['url']
                            },
                        }

                    },
                    ferramentas: {
                        select: ['nome', 'id']
                    }
                }

            }

        );
        const ferr = await strapi.query('api::ferramenta.ferramenta').findMany();



        console.log(instituicoes, ferr)


        await ctx.render('dashboard/admin/index', { user: {}, instituicoes, ferr });


    } catch (error) {

        console.log(error)
            // ctx.redirect('/auth/login')
    }



});





////****************************** Api ******************************** ////





module.exports = router;