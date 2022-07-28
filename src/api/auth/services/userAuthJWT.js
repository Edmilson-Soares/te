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

    async jwt_app(authorization) {

        let ctx = {
            request: {
                header: {
                    authorization
                }
            }
        }


        if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
            try {
                const { id, role, isAdmin = false } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);


                console.log(id, role, "iiddd")
                return {
                    data: {
                        id,
                        role
                    }
                }

            } catch (error) {
                console.log(error)
                throw new ValidationError('Incorrect jwt');
            }

        } else {
            throw new ValidationError('Incorrect jwt');
        }


    }

};
