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



    async forgot_password({ email }, url_server) {


        // Check if the provided email is valid or not.
        const isEmail = emailRegExp.test(email);

        if (isEmail) {
            email = email.toLowerCase();
        } else {
            throw new ValidationError('Please provide a valid email address');
        }

        const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });

        // Find the user by email.
        const user = await strapi
            .query('plugin::users-permissions.user')
            .findOne({ where: { email: email.toLowerCase() } });

        // User not found.
        if (!user) {
            throw new ApplicationError('This email does not exist');
        }

        // User blocked
        if (user.blocked) {
            throw new ApplicationError('This user is disabled');
        }

        // Generate random token.
        const resetPasswordToken = crypto.randomBytes(64).toString('hex');

        const settings = await pluginStore.get({ key: 'email' }).then(storeEmail => {
            try {
                return storeEmail['reset_password'].options;
            } catch (error) {
                throw new ApplicationError(error.message)
            }
        });

        const advanced = await pluginStore.get({
            key: 'advanced',
        });



        let url = `${url_server}/auth/new_password?code=${resetPasswordToken}`;
        try {
            // Send an email to the user.
            //event.emit("password_user", { strapi, user, settings, url })

        } catch (err) {
            throw new ApplicationError(err.message);
        }

        // Update the user.
        await strapi
            .query('plugin::users-permissions.user')
            .update({ where: { id: user.id }, data: { resetPasswordToken } });

        return { ok: true };
    },


};
