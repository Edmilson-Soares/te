'use strict';

const render = require('koa-ejs');
const path = require('path');
const router_sistema = require('./web/routers')


const event = require('./events/nodejs/index')

const ferramentaUtentes = require('./microserves/mqtt/services/ferramentas')

let time_game;

let io;

function set_time_game() {
    console.log("entrou")
    time_game = setInterval(async() => {

        ferramentaUtentes.setTempo()
        console.log("1minuto")

        io.emit('tempo', {})
    }, 60 * 1000);
}


function clear_time_game() {
    clearInterval(time_game)
    console.log("off")
}

const { jwt_app } = require('./api/auth/services/userAuthJWT');


const mqqt_cliente = require('./microserves/mqtt/index');
const menteAlertaSemanal = require('./usecase/alerta');


mqqt_cliente.on('connect', () => {

    console.log("conectado!!!!!")
    mqqt_cliente.subscribe("start")
    mqqt_cliente.subscribe("result")
    mqqt_cliente.subscribe("close")
    mqqt_cliente.subscribe("CloseFurramentas")

})



module.exports = {

    async register({ strapi }) {
        ///conficuração da views
        render(strapi.server.app, {
            root: path.join(__dirname, 'web/views'),
            viewExt: 'ejs',
            "layout": false,
            cache: false,
            debug: false
        });
        ///rotas do site
        strapi.server.app.use(router_sistema.routes()).use(router_sistema.allowedMethods());



    },

    async bootstrap({ strapi }) {

        io = require("socket.io")(strapi.server.httpServer);


        io.use(async(socket, next) => {
            //.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            try {


                const { data } = await jwt_app(socket.handshake.headers.authorization)
                socket.user = data

                console.log(socket.handshake.headers.authorization, "dddd---", socket.user)

                if (socket.user.id && socket.user.role) {
                    next()
                }

            } catch (e) {
                next(e)

            }




        })

        function addUtenteFerramenta(utente) {
            console.log(utente)
            io.emit(`addutente:${utente.instituicao}`, utente)
        }

        function addUtente(utente) {
            console.log(utente, "eddd-mil")
            io.emit(`addUtente:${utente.instituicao.id}`, utente)

        }


        function editUtenteFerramenta(utente) {
            io.emit(`edit:${utente.instituicao}`, utente, "editar")
        }

        function closeUtenteFerramenta(utente) {
            io.emit(`edit:${utente.instituicao}`, utente, "fechar")
        }

        // Run when mqqt_cliente connects
        io.on('connection', (socket) => {
            console.log("Conectou----")

            socket.on('getUtentes', ({ id }) => {

                let f = ferramentaUtentes.get(id)
                io.emit(`add:${id}`, f)
            });




            // Runs when mqqt_cliente disconnects
            socket.on('disconnect', () => {



            });
        });


        mqqt_cliente.on('message', async(topic, start, result, close) => {

            event.emit('mqtt', topic, start, result, close)

        })


        event.on('ferramenta', (utente) => {
            console.log(utente)
        });

        event.on("addUtenteFerramenta", addUtenteFerramenta)

        event.on("editUtenteFerramenta", editUtenteFerramenta)
        event.on("closeUtenteFerramenta", closeUtenteFerramenta)
        event.on("utenteCreate", addUtente)



        event.on('start_time_game', set_time_game);
        event.on('stop_time_game', clear_time_game);



        // await menteAlertaSemanal();
        // console.log(a[0].utentes[0].testes)

    },
};
