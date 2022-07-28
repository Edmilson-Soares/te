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
const { getService } = require('./utils');

const createUser = require('../services/userAuthcreate');

const event = require('../../../events/nodejs')
const {
    validateCallbackBody,
    validateRegisterBody,
    validateSendEmailConfirmationBody,
} = require('./validation/auth');
const userAuthLogin = require('../services/userAuthLogin');
const userAuthForgotPassword = require('../services/userAuthForgotPassword');
const userAuthNewPassword = require('../services/userAuthNewPassword');
const userAuthNewPasswordConta = require('../services/userAuthNewPasswordConta');
const userAuthJWT = require('../services/userAuthJWT');

const { sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');

    return sanitize.contentAPI.output(user, userSchema, { auth });
};

module.exports = {

    async logout(ctx) {

        try {


            ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, ``, { httpOnly: false });




            console.log("ddd")
            ctx.redirect('/auth/login')

        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }


    },

    async login(ctx) {

        try {
            const provider = ctx.params.provider || 'local';
            const params = ctx.request.body;
            let auth = await userAuthLogin.login(params, provider)

            ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, `Bearer ${auth.jwt}`, { httpOnly: false });
            ctx.send(auth);
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }


    },

    async register_client(ctx) {

        try {
            let auth = await createUser.register_client(ctx.request.body)

            ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, `Bearer ${auth.jwt}`, { httpOnly: false });
            ctx.send(auth);
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)


        }


    },

    async register_user(ctx) {

        try {
            let auth = await createUser.register_user(ctx.request.body)

            ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, `Bearer ${auth.jwt}`, { httpOnly: false });
            ctx.send(auth);
        } catch (error) {
            ctx.status = 400
            ctx.send(error)

        }

    },



    async forgot_password(ctx) {
        try {
            let auth = await userAuthForgotPassword.forgot_password(ctx.request.body, ctx.request.URL.origin)


            ctx.send(auth);
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }

    },


    async new_password(ctx) {
        try {
            let auth = await userAuthNewPassword.new_password(ctx.request.body, ctx.params)

            ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, `Bearer ${auth.jwt}`, { httpOnly: false });
            ctx.send(auth);
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }

    },



    async new_password_conta(ctx) {

        try {
            let auth = await userAuthNewPasswordConta.new_password_conta(ctx.request.body, ctx.params)

            ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, `Bearer ${auth.jwt}`, { httpOnly: false });
            ctx.send(auth);
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }

    },

    async jwt_app(ctx) {

        try {
            let auth = await userAuthJWT.jwt_app(ctx.request.header.authorization)
            ctx.send(auth);
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }



    }

};