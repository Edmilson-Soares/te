'use strict';

/**
 * alerta service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::alerta.alerta');
