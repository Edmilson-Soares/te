'use strict';

/**
 * utente service.
 */

const { createCoreService } = require('@strapi/strapi').factories;


module.exports = createCoreService('api::utente.utente', ({ strapi }) => ({
    async create(params) {
        // some logic here

        params.data.instituicao = params.data.inst
        delete params.data.inst
        const result = await super.create(params);
        return result;
    }
}));
