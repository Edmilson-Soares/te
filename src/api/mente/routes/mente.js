module.exports = {
    routes: [{
        method: 'GET',
        path: '/3mente/relatorio/:start/:end/:id',
        handler: 'mente.relatorio',
        config: {
            auth: false,

        }
    }],
};
