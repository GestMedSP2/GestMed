var database = require("../database/config");

function criar(idEmpresa, nomeSetor, armazenaTermolabeis) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ");
    var instrucao = `
        INSERT INTO setor (fkEmpresaS, nomeSetor, armazenaTermolabeis) VALUES (${idEmpresa}, '${nomeSetor}', ${armazenaTermolabeis});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    criar,
}
