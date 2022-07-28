async function menteUtente(id = 1, utente) {



    const user = await strapi.query('plugin::users-permissions.user').findOne({
        select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto'],
        where: {
            id
        },
        populate: {
            'foto': {
                select: ['url']
            },
            'intituicao_tecnico': {
                select: ['nome', 'descricao', 'email', 'local'],
                populate: {
                    logo: {
                        select: ['url']
                    },
                    responsaveis: {
                        select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto']
                    },
                    utentes: {
                        select: ['*'],
                        where: {
                            id: utente,
                            arquivar: false
                        },

                        populate: {
                            img: {
                                select: ['url']
                            },
                            observacaos: {
                                select: ['*'],
                                orderBy: { createdAt: 'desc' },
                            },
                            alerta: {
                                start: 0,
                                limit: 1,

                                orderBy: { createdAt: 'desc' },
                                populate: {
                                    testes: {
                                        where: {
                                            utente: {
                                                id: utente
                                            }

                                        },

                                        select: ['*'],



                                    },
                                }
                            }
                        }

                    }
                }
            }
        }


    });


    //  console.log(user.intituicao_responsavel.utentes[0])

    return user
}



module.exports = menteUtente;