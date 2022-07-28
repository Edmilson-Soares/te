'use strict';

/**
 * Auth.js controller
 *
 * @description: A set of functions called "actions" for managing `Auth`.
 */

/* eslint-disable no-useless-escape */
const crypto = require('crypto');
const _ = require('lodash');
const utils = require('@strapi/utils');
const { getService } = require('./../controllers/utils');

const event = require('../../../events/nodejs')
const {
    validateCallbackBody,
    validateRegisterBody,
    validateSendEmailConfirmationBody,
} = require('./../controllers/validation/auth');

const { sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');

    return sanitize.contentAPI.output(user, userSchema, { auth });
};

module.exports = {


    async register_client(data) {
        const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });

        const settings = await pluginStore.get({
            key: 'advanced',
        });

        if (!settings.allow_register) {
            throw new ApplicationError('Register action is currently disabled');
        }

        const params = {
            ..._.omit(data, ['confirmed', 'confirmationToken', 'resetPasswordToken']),
            provider: 'local',
        };
        await validateRegisterBody(params);

        // Throw an error if the password selected by the user
        // contains more than three times the symbol '$'.
        if (getService('user').isHashed(params.password)) {
            throw new ValidationError(
                'Your password cannot contain more than three times the symbol `$`'
            );
        }

        const role = await strapi
            .query('plugin::users-permissions.role')
            .findOne({ where: { type: settings.default_role } });

        if (!role) {
            throw new ApplicationError('Impossible to find the default role');
        }

        // Check if the provided email is valid or not.
        const isEmail = emailRegExp.test(params.email);

        if (isEmail) {
            params.email = params.email.toLowerCase();
        } else {
            throw new ValidationError('Please provide a valid email address');
        }

        params.role = role.id;

        const user = await strapi.query('plugin::users-permissions.user').findOne({
            where: { email: params.email },
            populate: {
                role: {
                    select: ['id']
                }
            }
        });

        if (user && user.provider === params.provider) {
            throw new ApplicationError('Email is already taken');
        }

        if (user && user.provider !== params.provider && settings.unique_email) {
            throw new ApplicationError('Email is already taken');
        }

        try {
            if (!settings.email_confirmation) {
                params.confirmed = true;
            }

            const user = await getService('user').add(params);
            user.role = role.name

            let jwt_login = getService('jwt').issue(_.pick(user, ['id', 'role']));

            return {
                jwt: jwt_login,
                role: role.name
            };

        } catch (err) {
            if (_.includes(err.message, 'username')) {
                throw new ApplicationError('Username already taken');
            } else if (_.includes(err.message, 'email')) {
                throw new ApplicationError('Email already taken');
            } else {
                strapi.log.error(err);
                throw new ApplicationError('An error occurred during account creation');
            }
        }
    },

    async register_user(data) {
        const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });

        const settings = await pluginStore.get({
            key: 'advanced',
        });

        if (!settings.allow_register) {
            throw new ApplicationError('Register action is currently disabled');
        }

        const params = {
            ..._.omit(data, ['confirmed', 'confirmationToken', 'resetPasswordToken']),
            provider: 'local',
        };

        await validateRegisterBody(params);

        // Throw an error if the password selected by the user
        // contains more than three times the symbol '$'.
        if (getService('user').isHashed(params.password)) {
            throw new ValidationError(
                'Your password cannot contain more than three times the symbol `$`'
            );
        }



        if (!params.role) {
            throw new ApplicationError('Impossible to find the default role');
        }

        // Check if the provided email is valid or not.
        const isEmail = emailRegExp.test(params.email);

        if (isEmail) {
            params.email = params.email.toLowerCase();
        } else {
            throw new ValidationError('Please provide a valid email address');
        }



        const user = await strapi.query('plugin::users-permissions.user').findOne({
            where: { email: params.email },
            populate: {
                role: {
                    select: ['name']
                }
            }
        });

        if (user && user.provider === params.provider) {
            throw new ApplicationError('Email is already taken');
        }

        if (user && user.provider !== params.provider && settings.unique_email) {
            throw new ApplicationError('Email is already taken');
        }

        try {
            if (!settings.email_confirmation) {
                params.confirmed = true;
            }

            const user = await getService('user').add(params);

            const role_user = await strapi
                .query('plugin::users-permissions.role')
                .findOne({ where: { id: params.role } });
            user.role = role_user.name

            let jwt_login = getService('jwt').issue(_.pick(user, ['id', 'role']));

            //console.log("ddddd--X")

            event.emit("creat_user", { strapi, user })
                // creat_user
            return {
                jwt: jwt_login,
                role: role_user.name
            };
        } catch (err) {
            if (_.includes(err.message, 'username')) {
                throw new ApplicationError('Username already taken');
            } else if (_.includes(err.message, 'email')) {
                throw new ApplicationError('Email already taken');
            } else {
                strapi.log.error(err);
                throw new ApplicationError('An error occurred during account creation');
            }
        }
    },




};