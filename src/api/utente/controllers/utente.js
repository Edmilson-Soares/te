'use strict';

/**
 *  utente controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::utente.utente', ({ strapi }) => ({
    async create(ctx) {
        ctx.request.body.data.inst = ctx.request.body.data.instituicao
        const response = await super.create(ctx);
        return response;
    }
}));
