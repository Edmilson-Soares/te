'use strict';

/**
 * config router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;


module.exports = {
    routes: [{
            method: 'PUT',
            path: '/instituicao/tecnicos/:id',
            handler: 'utente.update_tecnico',
            config: {
                auth: false,
            },
        },
        {
            method: 'PUT',
            path: '/instituicao/users/:id',
            handler: 'utente.update_tecnico',
            config: {
                auth: false,
            },
        },
        {
            method: 'PUT',
            path: '/instituicao/utentes/:id',
            handler: 'utente.update',
            config: {
                auth: false,
            },
        },

        {
            method: 'POST',
            path: '/instituicao/utentes',
            handler: 'utente.create',
            config: {
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/auth/register',
            handler: 'config.register_client',
            config: {
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/auth/forgot_password',
            handler: 'config.forgot_password',
            config: {
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/auth/new_password',
            handler: 'config.new_password',
            config: {
                auth: false,
            },
        },

        {
            method: 'POST',
            path: '/auth/new_password_conta',
            handler: 'config.new_password_conta',
            config: {
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/auth/login',
            handler: 'config.login',
            config: {
                auth: false,
            },
        },
    ],
};