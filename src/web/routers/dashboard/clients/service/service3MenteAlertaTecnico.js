async function menteAlerta(id = 1) {
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
                    alertas: {

                        start: 0,
                        limit: 1,

                        orderBy: { createdAt: 'desc' },
                        populate: {
                            testes: {
                                populate: {
                                    utente: {
                                        select: ['id']
                                    }
                                }
                            },
                            utentes: {
                                where: {
                                    arquivar: false
                                },
                                populate: {
                                    img: {
                                        select: ['url', 'id']
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }


    });




    return user
}






module.exports = menteAlerta;