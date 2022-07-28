async function mentePerfil(id = 1) {

    const user = await strapi.query('plugin::users-permissions.user').findOne({
        select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto', 'data', 'sexo'],
        where: {
            id
        },
        populate: {
            'foto': {
                select: ['url']
            },
            'intituicao_tecnico': {
                select: ['nome', 'descricao', 'contacto', 'email', 'local'],
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
                        select: ['nome', 'observacao'],

                    }
                }
            }
        }


    });

    return user
}






module.exports = mentePerfil;