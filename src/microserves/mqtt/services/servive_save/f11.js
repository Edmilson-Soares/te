/**
 *                 instituicao: data1[0],
                ferramenta: [data1[1]],
 */

async function save(data1, user, soma) {

    try {
        const teste = await strapi.entityService.create('api::teste.teste', {
            data: {
                acerto: user.acertou,
                erro: user.errou,
                nteste: soma,
                utente: [user.id],
                utente_f3: [user.id],
                tempo: user.tempo,
                f: "3",
                ferramenta: [data1[1]],
                p_acerto: soma > 0 ? (user.acertou / soma) * 100 : 0
            },
        });


        let p_ac = soma > 0 ? (user.acertou / soma) * 100 : 0;
        let dados = user.n_1.split(',')

        let dado = user.n.split(',')



        let soma_f3 = parseInt(dados[0]) + p_ac
        let soma_t = parseInt(dados[3]) + user.tempo
        let media_f3 = soma_f3 / (parseInt(dados[1]) + 1)

        let f3 = `${soma_f3},${parseInt(dados[1])+1},${media_f3},${soma_t}`



        ///${parseInt(dado[1])+1},${soma_d/(parseInt(dado[1])+1)}

        let soma_d = media_f3 + parseFloat(dado[0]) + parseFloat(dado[2]) + parseFloat(dado[3]) + parseFloat(dado[4]) + parseFloat(dado[5]) + parseFloat(dado[6]) + parseFloat(dado[7]) + parseFloat(dado[8]) + parseFloat(dado[9]) + parseFloat(dado[10]);




        let n = user.n2;


        let media_d = 0.0;

        if (n > 0) {
            media_d = soma_d / n;
        } else {
            media_d = soma_d / 1;
        }

        let f = `${dado[0]},${dado[1]},${media_f3},${dado[3]},${dado[4]},${dado[5]},${dado[6]},${dado[7]},${dado[8]},${dado[9]},${dado[10]},${media_d}`



        const utente = await strapi.entityService.update('api::utente.utente', user.id, {
            data: {
                "f": f,
                "f3": f3
            },
        });
        return 1


    } catch (error) {
        throw new Error('Não foi possível realizar a operação');
    }




}



module.exports = save;
