const mente = require('./service3Mente');
const menteTecnico = require("./service3MenteTecnico");
const menteUtentes = require("./service3MenteUtentes");
const menteUtenteTecnico = require("./service3MenteUtenteTecnico");
const menteUtente = require("./service3MenteUtente");
const mentePerfil = require('./service3MentePerfil')
const mentePerfilTecnico = require('./service3MentePerfilTecnico')
const menteAlerta = require('./service3MenteAlerta')
const menteAlertaTecnico = require('./service3MenteAlertaTecnico')
const menteArquivos = require('./service3MenteArquivos')
const menteMonitorizacao = require('./service3MenteMonitorizacao')
const menteMonitorizacaoTecnico = require('./service3MenteMonitorizacaoTecnico')
const menteRelatorio = require('./service3MenteRelatorio')
const menteRelatorioTecnico = require('./service3MenteRelatorioTecnico')





module.exports = {
    mente,
    menteTecnico,
    menteUtentes,
    menteUtente,
    mentePerfil,
    menteAlerta,
    menteArquivos,
    menteMonitorizacao,
    menteRelatorio,
    menteUtenteTecnico,
    menteAlertaTecnico,
    menteMonitorizacaoTecnico,
    mentePerfilTecnico,

    menteRelatorioTecnico
};