const f = require('./servive_save/index')
const eventos = require("./../../../events/nodejs")

const client = require('./../../../microserves/mqtt')


var topic = 'CloseFurramentas'

client.on('message', (topic, message) => {


    if (topic == 'CloseFurramentas') {
        ferramentas = []
    }
})


/***
 *
 * {
    nome: 'dddbbb',
    f_jogada: [
        '2', '0', '0', '0',
        '0', '0', '0', '0',
        '0', '0', '0'
    ],
    foto: undefined,
    room: 'Edmilson Soares',
    teste: ["1", "0", "1"],
    acertou: 2,
    errou: 1,
    n2: 1,
    n: '50,0,0,0,0,0,0,0,0,0,0,100',
    n_1: '100,2,50,0',
    ferramenta: '1',
    instituicao: '3',
    tempo: 0,
    id: 6
}
 *
 *
 */
let ferramentas = [];

function get(id) {
    let utentes = []
    ferramentas.map(f => {
        if (f.instituicao == id) {
            utentes.push(f)
        }
    })

    return utentes
}


function getv() {



    return ferramentas
}

function getUsers(data) {
    existe = false
    ferramentas.map(f => {
        if (f.device == `${data[0]}-${data[1]}:${data[3]}` && f.instituicao == data[0]) {
            existe = true;
        }
    })



    return existe
}


function add(data, utente) {

    if (!getUsers(data)) {

        if (ferramentas.length == 0) {

        }
        ferramentas.push(utente)
        return utente;

    } else {
        return false;
    }

}

function update(data1) {

    let utente;
    ferramentas.map((user, index) => {

        console.log(user, "utente")

        if (user.device == `${data1[0]}-${data1[1]}:${data1[3]}`) {

            let b = user.teste
            b.push(data1[2])
            let u = {
                nome: user.nome,
                foto: user.foto,
                teste: b,
                f_jogada: user.f_jogada,
                n: user.n,
                device: user.device,
                n2: user.n2,
                n_1: user.n_1,
                tempo: user.tempo,
                acertou: data1[2] > 0 ? user.acertou + 1 : user.acertou,
                errou: data1[2] < 1 ? user.errou + 1 : user.errou,
                ferramenta: user.ferramenta,
                instituicao: user.instituicao,
                id: user.id
            }


            ferramentas[index] = u;


            utente = ferramentas[index]


        }

    })


    if (utente) {
        return utente
    } else {
        return {}
    }
}



function getFerramenta(id) {
    let f = ferramentas.map(ferramenta => {
        if (ferramenta.instituicao == id) {
            return ferramenta
        }
    });

    return f;
}


function setTempo() {
    ferramentas.map(ferramenta => {
        ferramenta.tempo += 1;
        console.log(ferramenta)

    });

}


async function salva(data1) {


    console.log("dd---DD", data1)

    try {

        let a = ferramentas
        let b = 0

        let utenteSelet = {}

        let ok_save;


        a.map(async(utente, index) => {

            if (utente.device == `${data1[0]}-${data1[1]}:${data1[2]}`) {
                utenteSelet = utente
                b = index
            }

            console.log(utenteSelet)



        })


        let soma = utenteSelet.acertou + utenteSelet.errou

        if (data1[1] == 1) {

            ok_save = await f.f1_save(data1, utenteSelet, soma)

        } else if (data1[1] == 2) {

            ok_save = await f.f2_save(data1, utenteSelet, soma)

        } else if (data1[1] == 3) {

            ok_save = await f.f3_save(data1, utenteSelet, soma)

        } else if (data1[1] == 4) {

            ok_save = await f.f4_save(data1, utenteSelet, soma)

        } else if (data1[1] == 5) {

            ok_save = await f.f5_save(data1, utenteSelet, soma)

        } else if (data1[1] == 6) {

            ok_save = await f.f6_save(data1, utenteSelet, soma)

        } else if (data1[1] == 7) {

            ok_save = await f.f7_save(data1, utenteSelet, soma)

        } else if (data1[1] == 8) {

            ok_save = await f.f8_save(data1, utenteSelet, soma)

        } else if (data1[1] == 9) {

            ok_save = await f.f9_save(data1, utenteSelet, soma)

        } else if (data1[1] == 10) {

            ok_save = await f.f10_save(data1, utenteSelet, soma)

        } else if (data1[1] == 11) {

            ok_save = await f.f11_save(data1, utenteSelet, soma)

        }

        if (ok_save == 1) {
            ferramentas.splice(b, 1);

            console.log(ferramentas)
            return utenteSelet
        } else {
            console.log("DDDD--")
            return {}
        }


    } catch (e) {

        return {
            e
        }
    }

}


function clearFerramenta() {
    ferramentas = [];
}

module.exports = { add, update, getFerramenta, setTempo, salva, get, ferramentas, clearFerramenta }