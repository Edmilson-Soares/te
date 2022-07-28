const { jwt_app } = require('./../../../../api/auth/services/userAuthJWT');


async function auth(jwt) {
    const { data } = await jwt_app(jwt)


    console.log(data)

    if (data.role != "cliente") throw new Error("Não Autorizado!!")

    return data
}


module.exports = auth;