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
const { getService } = require('../controllers/utils');

const event = require('../../../events/nodejs')
const {
    validateCallbackBody,
    validateRegisterBody,
    validateSendEmailConfirmationBody,
} = require('../controllers/validation/auth');

const { sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');

    return sanitize.contentAPI.output(user, userSchema, { auth });
};

module.exports = {

    async new_password_conta(body, params_) {
        const params = _.assign({}, body, params_);

        if (
            params.password &&
            params.passwordConfirmation &&
            params.password === params.passwordConfirmation &&
            params.email
        ) {
            const user = await strapi
                .query('plugin::users-permissions.user')
                .findOne({
                    where: { email: `${params.email}` }

                    ,
                    populate: {
                        role: {
                            select: ['name']
                        }
                    }

                });

            if (!user) {
                throw new ValidationError('Incorrect provided');
            }

            const validPassword = await getService('user').validatePassword(
                params.password,
                user.password
            );


            if (!validPassword) {
                throw new ValidationError('Incorrect provided');
            }

            await getService('user').edit(user.id, { resetPasswordToken: null, password: params.password });

            let jwt_login = getService('jwt').issue({ id: user.id, role: user.role.name })

            return {
                jwt: jwt_login,
                role: user.role.name
            };
        } else if (
            params.password &&
            params.passwordConfirmation &&
            params.password !== params.passwordConfirmation
        ) {
            throw new ValidationError('Passwords do not match');
        } else {
            throw new ValidationError('Incorrect params provided');
        }
    }

};