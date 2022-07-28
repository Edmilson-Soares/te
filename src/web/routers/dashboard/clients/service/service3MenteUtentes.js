async function menteUtentes(id = 1) {
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
                    logo: {
                        select: ['url']
                    },
                    responsaveis: {
                        select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto']
                    },
                    utentes: {
                        select: ['nome', 'observacao', 'id', 'data', 'rfid', 'sexo'],
                        populate: {
                            img: {
                                select: ['url', 'id']
                            }
                        },
                        where: {
                            arquivar: false
                        }

                    }
                }
            }
        }


    });


    //select: ['nome', 'observacao', 'id', 'data', 'rfid', 'sexo'],
    ///console.log(user.intituicao_responsavel.utentes)

    return user
}






module.exports = menteUtentes;