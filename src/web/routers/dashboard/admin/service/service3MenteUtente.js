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
            'intituicao_responsavel': {
                select: ['nome', 'descricao', 'email', 'local'],
                populate: {
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


    // console.log(user.intituicao_responsavel.utentes[0].alerta.testes)

    return user
}






module.exports = menteUtente;
