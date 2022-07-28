var dayjs = require('dayjs')

let dia = dayjs().$D
let semana = dayjs().day()

let dia_start = dayjs().date(dia - semana)

async function menteAlertaSemanal() {
    const instituicoes = await strapi.query('api::intituicao.intituicao').findMany({
        select: ['id', 'nome'],
        populate: {
            alertas: {
                select: ['id']
            },
            utentes: {
                select: ['id', 'nome'],
                where: {
                    arquivar: false
                },
                populate: {

                    testes: {
                        select: ['id', 'p_acerto', 'tempo', 'f', 'createdAt'],
                        where: {
                            createdAt: {
                                $between: [dayjs().date(dia_start.$D - 6).$d, dia_start.$d],
                            }

                        },
                    }
                }
            }
        }


    });

    let utente_teste = []
    instituicoes.map(async instituicao => {
        let utente_i = []
        instituicao.utentes.map(utente => {
            let alerta = { tempo: 0, desempenho: 0 }

            utente.testes.map(teste => {
                // console.log(teste)
                utente_teste.push(teste.id)
                alerta.desempenho += teste.p_acerto
                alerta.tempo += teste.tempo
            })


            ///210/semana -30/dia
            ///alerta.tempo = alerta.tempo / utente.testes.length
            alerta.desempenho = alerta.desempenho / utente.testes.length
            if (alerta.tempo < 210 && alerta.desempenho < 25) {
                utente_i.push(utente.id)
                    //  console.log("entrou")
            } else {
                //  console.log("Não entrou")
            }

            //   console.log(alerta.tempo / utente.testes.length, alerta.desempenho / utente.testes.length)

        })




        const entry = await strapi.entityService.create('api::alerta.alerta', {
            data: {
                instituicao: instituicao.id,
                utentes: utente_i,
                testes: utente_teste,
                tempo_start: { data: dayjs().date(dia_start.$D - 6).$d },
                tempo_end: { data: dia_start.$d },
                tipo: `Alerta ${instituicao.alertas.length+1}`,
                publishedAt: new Date()
            },
        });



    })



    // return instituicoes




}



module.exports = menteAlertaSemanal