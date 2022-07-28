const events = require('events');
const { ferramentas, clearFerramenta } = require('../../microserves/mqtt/services/ferramentas');
const event = new events.EventEmitter();
const message_mqtt = require('./eventes_mqtt')




const mqtt = async(topic, start, result, close) => {
    console.log('I hear a scream!22');


    if (topic == 'CloseFurramentas') {
        //console.log("ddddd---///")
        //  clearFerramenta()



        //console.log("ddddd---///", ferramentas)
    } else {
        const { evento, utente, utenteCreate } = await message_mqtt(topic, start, result, close)

        if (utente.id && evento == "add") {
            await event.emit('addUtenteFerramenta', utente);

            console.log(ferramentas)

            if (ferramentas.length == 1) {
                event.emit("start_time_game")

            }
            // await event.emit('ferramenta', utente);
        } else if (utente.id && evento == "update") {
            await event.emit('editUtenteFerramenta', utente);
            // await event.emit('ferramenta', utente);
        } else if (utente.id && evento == "close") {

            console.log(utente.id)
            await event.emit('closeUtenteFerramenta', utente);
            if (ferramentas.length == 0) {
                event.emit("stop_time_game")

            }
            // await event.emit('ferramenta', utente);
        } else if (utente.id && evento == "createUtente") {
            console.log("passou*evento_mqtt")
            await event.emit('utenteCreate', utente);

            if (ferramentas.length == 1) {
                event.emit("start_time_game")

            }
            // await event.emit('ferramenta', utente);
        }

    }



}

var email_password = async({ strapi, user, settings, url }) => {
    try {
        await strapi.plugins['email'].services.email.send({
            to: user.email,
            from: '"MicroAITec" <microaitec@microaitec.com>',
            replyTo: settings.response_email,
            subject: settings.object,
            text: settings.message,
            html: `Click on link ${url}`,
        });

        console.log("fffff---1")
    } catch (error) {
        console.log(error, "fffffe")
    }
}

var email_creat_acount = async({ strapi, user }) => {
    try {
        await strapi.plugins['email'].services.email.send({
            to: user.email,
            from: '"MicroAITec" <microaitec@microaitec.com>',

            subject: 'A sua conta criada com sucesso!',
            text: 'Hello world!',
            html: 'Hello world!',
        });

        console.log("fffff---")
    } catch (error) {
        console.log(error, "fffffe")
    }
}



event.on('creat_user', email_creat_acount);

event.on('password_user', email_password);




event.on('mqtt', mqtt);



//Fire the 'scream' event:





module.exports = event;
