var database = require("../database/config");

function criar(idEmpresa, nomeSetor, armazenaTermolabeis) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ");
    var instrucao = `
        INSERT INTO setor (fkEmpresaS, nomeSetor, armazenaTermolabeis) VALUES (${idEmpresa}, '${nomeSetor}', ${armazenaTermolabeis});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idEmpresa) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ");
    var instrucao = `
        SELECT s.idSetor, s.nomeSetor, CONCAT(endereco.logradouro, ', ', endereco.numero) as enderecoSetor, 
        (CASE WHEN armazenaTermolabeis = TRUE THEN 7 ELSE 29 END) AS temperaturaMaxima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 9 ELSE 32 END) AS temperaturaAlertaMaxima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 1 ELSE 15 END) AS temperaturaAlertaMinima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 3 ELSE 16 END) AS temperaturaMinima,
        SUM(CASE WHEN sa.status = 'Ativo' THEN 1 ELSE 0 END)setoresAtivos, 
        SUM(CASE WHEN sa.status = 'Inativo' THEN 1 ELSE 0 END)setoresInativos, 
        SUM(CASE WHEN sa.status = 'Em manutenção' THEN 1 ELSE 0 END)setoresManutencao,
        (SELECT temperatura FROM dados JOIN sensor as sensor2
        ON sensor2.idSensor = dados.fkSensor JOIN setor as setor2
        ON setor2.idSetor = sensor2.fkSetor
        WHERE idSetor = s.idSetor ORDER BY dataColeta DESC LIMIT 1) AS Temperatura,
        (SELECT umidade FROM dados JOIN sensor as sensor2
        ON sensor2.idSensor = dados.fkSensor JOIN setor as setor2
        ON setor2.idSetor = sensor2.fkSetor
        WHERE idSetor = s.idSetor ORDER BY dataColeta DESC LIMIT 1) AS Umidade
        FROM setor as s
        JOIN empresa as e ON s.fkEmpresaSetor = e.idEmpresa
        JOIN endereco ON idEndereco = fkEndereco
        JOIN sensor as sa ON s.idSetor = sa.fkSetor
        WHERE idEmpresa = ${idEmpresa}
        GROUP BY s.idSetor, s.nomeSetor, endereco.logradouro;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function detalhar(idSetor) {
    var instrucao = `
        SELECT nomeSetor, 
        (CASE WHEN armazenaTermolabeis = TRUE THEN 7 ELSE 29 END) AS temperaturaMaxima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 9 ELSE 32 END) AS temperaturaAlertaMaxima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 1 ELSE 15 END) AS temperaturaAlertaMinima,
        (CASE WHEN armazenaTermolabeis = TRUE THEN 3 ELSE 16 END) AS temperaturaMinima
        FROM setor
        WHERE idSetor = ${idSetor};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    criar,
    listar,
    detalhar
}
