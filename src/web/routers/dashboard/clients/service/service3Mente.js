async function mente(id = 1) {
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
                    tecnicos: {
                        select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto'],

                    },
                    ferramentas: {
                        select: ['nome', 'descricao'],

                    },
                    utentes: {
                        select: ['*'],
                        where: {
                            arquivar: false
                        },
                        populate: {
                            'img': {
                                select: ['url']
                            }
                        }

                    }
                }
            }
        }


    });


    return user
}






module.exports = mente;