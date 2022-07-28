const ferramenta = require('./ferramentas')

function create(utente, data) {


    let t = true;

    let f_jogada = [utente.f1.split(",")[1], utente.f2.split(",")[1],
        utente.f3.split(",")[1], utente.f4.split(",")[1], utente.f5.split(",")[1], utente.f6.split(",")[1], utente.f7.split(",")[1],
        utente.f8.split(",")[1], utente.f9.split(",")[1], utente.f10.split(",")[1], utente.f11.split(",")[1]
    ]


    let n2 = 0;

    f_jogada.map(f => {
        if (parseInt(f) > 0) {
            n2 += 1;
        }
    })

    let n = utente.f;

    let n_1 = "";
    if (data[1] == 1) {
        n_1 = utente.f1;
    }
    if (data[1] == 2) {
        n_1 = utente.f2;

    }
    if (data[1] == 3) {
        n_1 = utente.f3;

    }
    if (data[1] == 4) {
        n_1 = utente.f4;
    }

    if (data[1] == 5) {
        n_1 = utente.f5;
    }
    if (data[1] == 6) {
        n_1 = utente.f6;

    }
    if (data[1] == 7) {
        n_1 = utente.f7;

    }

    if (data[1] == 8) {
        n_1 = utente.f8;
    }
    if (data[1] == 9) {
        n_1 = utente.f9;

    }
    if (data[1] == 10) {
        n_1 = utente.f10;

    }
    if (data[1] == 11) {
        n_1 = utente.f11;

    }



    const f = {
        nome: utente.nome ? utente.nome : "",
        f_jogada,
        foto: utente.img ? utente.img[0].url : "",
        room: utente.instituicao.nome,
        teste: [],
        device: `${data[0]}-${data[1]}:${data[3]}`,
        acertou: 0,
        errou: 0,
        n2,
        n,
        n_1,
        ferramenta: data[1],
        instituicao: data[0],
        tempo: 0,
        id: utente.id
    };

    return ferramenta.add(data, f)

}


module.exports = create
