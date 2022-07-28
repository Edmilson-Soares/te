var dayjs = require('dayjs')

let dia = dayjs().$D
let semana = dayjs().day()

let dia_start = dayjs().date(dia - semana)

async function menteRelatorio(id = 1) {
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
                            arquivar: false
                        },
                        populate: {
                            testes: {
                                select: ['f', 'tempo', 'p_acerto', 'createdAt'],
                                where: {
                                    createdAt: {
                                        $between: [dia_start.$d, dayjs().date(dia_start.$D + 6).$d],
                                    }
                                }
                            }
                        }

                    }
                }
            }
        }


    });


    console.log(dayjs().date(dia_start.$D + 6).$d, dia_start.$d)


    return user
}






module.exports = menteRelatorio;