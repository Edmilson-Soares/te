const ferramenta = require('./../../microserves/mqtt/services/ferramentas')
const create = require('./../../microserves/mqtt/services/utentesFerramenta')
const update = require('./../../microserves/mqtt/services/utenteUpdateFerramenta')

const eventos = require('./index')


async function message(topic, start, result, close) {
    var data1 = start.toString().split(",") || result.toString().split(",") || close.toString().split(",");

    console.log(data1)

    if (topic == "start") {
        data1[2] = data1[2].substring(0, 8)

        try {
            const utente = await strapi
                .query('api::utente.utente')
                .findOne({
                    where: {
                        rfid: data1[2],
                        arquivar: false

                    },
                    populate: {
                        img: {
                            select: ['url']
                        },
                        instituicao: {
                            where: {
                                id: data1[0]
                            },
                            populate: {
                                ferramentas: {
                                    select: ['id', 'nome'],
                                }
                            }
                        }
                    }


                });


            let _f = false;

            if (utente) {
                if (utente.instituicao) {
                    utente.instituicao.ferramentas.map(f => {
                        if (data1[1] == f.id) {
                            _f = true;
                        }
                    })
                }
            }

            if (utente && _f) {

                if (data1.length == 4) {
                    let utenteCreate = create(utente, data1)

                    return { evento: "add", utente: utenteCreate }
                } else {
                    data1.push('00')
                    let utenteCreate = create(utente, data1)

                    return { evento: "add", utente: utenteCreate }
                }




            } else {
                try {
                    const entry = await strapi.entityService.create('api::utente.utente', {
                        data: {
                            nome: "",
                            rfid: data1[2],
                            instituicao: [data1[0]],
                            "f": "0,0,0,0,0,0,0,0,0,0,0,0,0",
                            "f1": "0,0,0,0",
                            "f2": "0,0,0,0",
                            "f3": "0,0,0,0",
                            "f4": "0,0,0,0",
                            "f5": "0,0,0,0",
                            "f6": "0,0,0,0",
                            "f7": "0,0,0,0",
                            "f8": "0,0,0,0",
                            "f9": "0,0,0,0",
                            "f10": "0,0,0,0",
                            "f11": "0,0,0,0",
                            publishedAt: new Date()

                        },
                    });


                    const utente = await strapi
                        .query('api::utente.utente')
                        .findOne({
                            where: {
                                rfid: data1[2]

                            },
                            populate: {
                                img: {
                                    select: ['url']
                                },
                                instituicao: {
                                    where: {
                                        id: data1[0]
                                    },
                                    populate: {
                                        ferramentas: {
                                            select: ['id', 'nome'],
                                        }
                                    }
                                }
                            }


                        });


                    let _f = false;

                    if (utente) {
                        if (utente.instituicao) {
                            utente.instituicao.ferramentas.map(f => {
                                if (data1[1] == f.id) {
                                    _f = true;
                                }
                            })
                        }
                    }

                    if (_f) {
                        if (data1.length > 3) {

                            return { evento: "createUtente", utente, utenteCreate: {} }
                        } else {




                            return { evento: "createUtente", utente, utenteCreate: {} }
                        }
                    } else {
                        throw new ApplicationError('This provider is disabled');
                    }



                } catch (error) {
                    throw new ApplicationError('This provider is disabled');
                }
            }

        } catch (error) {
            console.log(error)
        }


    } else if (topic == "result") {
        if (data1.length == 4) {
            let utenteUpdate = update(data1)
            console.log(utenteUpdate)
            return { evento: "update", utente: utenteUpdate }
        } else {
            data1.push('00')
            let utenteUpdate = update(data1)
            console.log(utenteUpdate)
            return { evento: "update", utente: utenteUpdate }
        }

    } else if (topic == "close") {

        if (data1.length == 4) {
            let utenteSalva = await ferramenta.salva(data1)

            return { evento: "close", utente: utenteSalva }
        } else {
            data1.push('00')
            let utenteSalva = await ferramenta.salva(data1)

            return { evento: "close", utente: utenteSalva }
        }


    }




}







module.exports = message;
