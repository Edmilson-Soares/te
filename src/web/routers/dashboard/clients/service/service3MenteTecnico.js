async function menteTecnico(id = 1) {
    const user = await strapi.query('plugin::users-permissions.user').findOne({
        select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto', 'sexo', 'data'],
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
                        select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto', 'id', 'sexo', 'data']
                    },
                    tecnicos: {
                        select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto', 'id', 'sexo', 'data'],
                        populate: {
                            foto: {
                                select: ['url', 'id']
                            }
                        }

                    }
                }
            }
        }


    });


    return user
}






module.exports = menteTecnico;