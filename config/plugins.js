module.exports = {

    'users-permissions': {
        config: {
            jwt: {
                expiresIn: '1d',
            },
        },

    },
    'empresa': {
        enabled: true,
        resolve: './src/plugins/empresa'
    },
    'events': {
        enabled: true,
        resolve: './src/plugins/events'
    },
    'instituicao': {
        enabled: true,
        resolve: './src/plugins/instituicao'
    },

    'site': {
        enabled: true,
        resolve: './src/plugins/site'
    },
    'auth': {
        enabled: true,
        resolve: './src/plugins/auth'
    },

}