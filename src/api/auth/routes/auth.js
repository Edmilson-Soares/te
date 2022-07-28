'use strict';

/**
 * config router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;


module.exports = {
    routes: [{
            method: 'GET',
            path: '/auth/logout',
            handler: 'auth.logout',
            config: {
                auth: false,
            },
        }, {
            method: 'POST',
            path: '/auth/login_v4',
            handler: 'auth.login',
            config: {
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/auth/register_v4',
            handler: 'auth.register_client',
            config: {
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/auth/register_conta_v4',
            handler: 'auth.register_user',
            config: {
                auth: false,
            },
        }, {
            method: 'GET',
            path: '/auth/jwt_v4',
            handler: 'auth.jwt_app',
            config: {
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/auth/forgot_password_v4',
            handler: 'auth.forgot_password',
            config: {
                auth: false,
            },
        },
        {
            method: 'POST',
            path: '/auth/new_password_v4',
            handler: 'auth.new_password',
            config: {
                auth: false,
            },
        },

        {
            method: 'POST',
            path: '/auth/new_password_conta_v4',
            handler: 'auth.new_password_conta',
            config: {
                auth: false,
            },
        }

    ],
};