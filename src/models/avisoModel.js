var database = require("../database/config");

function listar(idEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT nomeSetor, dataColeta, temperatura, umidade,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 7 ELSE 29 END) AS temperaturaAtencaoMaxima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 9 ELSE 32 END) AS temperaturaCriticaMaxima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 1 ELSE 15 END) AS temperaturaCriticaMinima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 3 ELSE 16 END) AS temperaturaAtencaoMinima
        FROM empresa
        JOIN setor ON setor.fkEmpresaSetor = empresa.idEmpresa JOIN sensor ON sensor.fkSetor = setor.idSetor
        JOIN dados ON dados.fkSensor = sensor.idSensor
        WHERE empresa.idEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
}
