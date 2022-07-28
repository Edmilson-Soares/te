'use strict';


module.exports = {

    async logout(ctx) {



        try {
            ctx.cookies.set('3@mente-microaitec', ``, { httpOnly: false });
            ctx.redirect('/auth/login')

        } catch (error) {
            ctx.redirect('/auth/login')
        }



    },


    async create(ctx) {

        const data = ctx.request.body.data
        data.arquivar = false

        let jwt = ctx.cookies.get('microaitec')

        ctx.request.header.authorization = jwt

        try {
            const entry = await strapi.entityService.create('api::utente.utente', {
                data,
            });

            ctx.send({
                data: entry
            })


        } catch (error) {
            throw new ApplicationError('This provider is disabled');
        }



    },
    async update(ctx) {

        const { id } = ctx.params

        const data = ctx.request.body.data

        console.log(data, id)

        let jwt = ctx.cookies.get('microaitec')

        ctx.request.header.authorization = jwt


        try {

            const entry = await strapi.entityService.update('api::utente.utente', id, {
                data,
            });

            ctx.send({
                data: entry
            })


        } catch (error) {
            console.log(error)
            throw new ApplicationError(error);
        }



    },
    async update_tecnico(ctx) {

        const { id } = ctx.params

        const data = ctx.request.body.data

        console.log(data, id)

        let jwt = ctx.cookies.get('microaitec')

        ctx.request.header.authorization = jwt


        try {

            const entry = await strapi.entityService.update('plugin::users-permissions.user', id, {
                data,
            });

            ctx.send({
                data: entry
            })


        } catch (error) {
            console.log(error)
            throw new ApplicationError(error);
        }



    },
    async update_user(ctx) {

        const { id } = ctx.params

        const data = ctx.request.body.data

        console.log(data, id)

        let jwt = ctx.cookies.get('microaitec')

        ctx.request.header.authorization = jwt


        try {

            const entry = await strapi.entityService.update('plugin::users-permissions.user', id, {
                data,
            });

            ctx.send({
                data: entry
            })


        } catch (error) {
            console.log(error)
            throw new ApplicationError(error);
        }



    }
};
