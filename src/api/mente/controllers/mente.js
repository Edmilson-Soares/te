'use strict';

/**
 * A set of functions called "actions" for `mente`
 */
// orderBy: { createdAt: 'desc' },
module.exports = {
    relatorio: async(ctx, next) => {
        try {

            const { start, end, id } = ctx.params

            console.log(start, end, id)
            let testes;

            if (start == end) {

                testes = await strapi.query('api::teste.teste').findMany({
                    select: ['tempo', 'id', 'p_acerto'],
                    where: {

                        utente: id,
                        createdAt: start
                    },
                    populate: {
                        ferramenta: {
                            select: 'nome'
                        }
                    }




                });

            } else {

                testes = await strapi.query('api::teste.teste').findMany({
                    select: ['tempo', 'id', 'p_acerto'],
                    where: {

                        utente: id,

                        createdAt: {
                            $between: [start, end],
                        }

                    },
                    populate: {
                        ferramenta: {
                            select: 'nome'
                        }
                    }




                });
            }


            let data = [

                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },


            ]

            testes.map(teste => {

                if (teste.ferramenta.nome == 'Almofada') {

                    data[0].q++
                        data[0].t += teste.tempo
                    data[0].d += teste.p_acerto

                }
                if (teste.ferramenta.nome == 'Manta') {

                    data[1].q++
                        data[1].t += teste.tempo
                    data[1].d += teste.p_acerto

                }
                if (teste.ferramenta.nome == 'Peixe') {

                    data[2].q++
                        data[2].t += teste.tempo
                    data[2].d += teste.p_acerto

                }

            })


            ctx.body = { data, ok: true };
        } catch (err) {
            ctx.body = err;
        }
    }
};
