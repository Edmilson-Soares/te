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



module.exports = {
    async login(params, provider) {


        const store = await strapi.store({ type: 'plugin', name: 'users-permissions' });

        if (provider === 'local') {
            if (!_.get(await store.get({ key: 'grant' }), 'email.enabled')) {
                throw new ApplicationError('This provider is disabled');
            }

            await validateCallbackBody(params);

            const query = { provider };

            // Check if the provided identifier is an email or not.
            const isEmail = emailRegExp.test(params.identifier);

            // Set the identifier to the appropriate query field.
            if (isEmail) {
                query.email = params.identifier.toLowerCase();
            } else {
                query.username = params.identifier;
            }

            // Check if the user exists.
            const user = await strapi.query('plugin::users-permissions.user').findOne({
                where: query,
                populate: {
                    role: {
                        select: ['name']
                    }
                }
            });

            if (!user) {
                throw new ValidationError('Invalid identifier or password');
            }

            if (
                _.get(await store.get({ key: 'advanced' }), 'email_confirmation') &&
                user.confirmed !== true
            ) {
                throw new ApplicationError('Your account email is not confirmed');
            }

            if (user.blocked === true) {
                throw new ApplicationError('Your account has been blocked by an administrator');
            }

            // The user never authenticated with the `local` provider.
            if (!user.password) {
                throw new ApplicationError(
                    'This user never set a local password, please login with the provider used during account creation'
                );
            }

            const validPassword = await getService('user').validatePassword(
                params.password,
                user.password
            );

            if (!validPassword) {
                throw new ValidationError('Invalid identifier or password');
            } else {

                console.log(user.role.name, "role")



                let jwt_login = getService('jwt').issue({ id: user.id, role: user.role.name })


                return {
                    jwt: jwt_login,
                    role: user.role.name

                }


            }
        }
    },



};
