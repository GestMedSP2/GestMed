var database = require("../database/config");

function buscarUltimosDados(idSetor) {
    instrucaoSql = ''

    /* if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } */
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT temperatura, umidade FROM dados JOIN sensor
        ON idSensor = fkSensor JOIN Setor
        ON idSetor = fkSetor
        WHERE idSetor = ${idSetor} ORDER BY dataColeta DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimosDadosGrafico(idSetor) {
    instrucaoSql = ''

    /* if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } */
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT DATE_FORMAT(dataColeta, '%H:%i') AS DataColeta, TRUNCATE(AVG(temperatura), 1) AS Temperatura, TRUNCATE(AVG(umidade), 1) as Umidade FROM dados JOIN sensor
        ON idSensor = fkSensor JOIN Setor
        ON idSetor = fkSetor
        WHERE DATE_FORMAT(dataColeta, '%H:%i') IN ('10:15', '10:20', '10:35') AND idSetor = ${idSetor} GROUP BY DATE_FORMAT(dataColeta, '%H:%i') ORDER BY dataColeta;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimoDadoGrafico(idSetor) {
    instrucaoSql = ''

    /* if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;
    } */
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT DATE_FORMAT(dataColeta, '%H:%i') AS DataColeta, TRUNCATE(AVG(temperatura), 1) AS Temperatura, TRUNCATE(AVG(umidade), 1) as Umidade FROM dados JOIN sensor
        ON idSensor = fkSensor JOIN Setor
        ON idSetor = fkSetor
        WHERE idSetor = ${idSetor} GROUP BY DATE_FORMAT(dataColeta, '%H:%i') ORDER BY dataColeta DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function buscarUltimasMedidas(idSetor, limite_linhas) {

//     instrucaoSql = ''

//     /* if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select top ${limite_linhas}
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,  
//                         momento,
//                         FORMAT(momento, 'HH:mm:ss') as momento_grafico
//                     from medida
//                     where fk_aquario = ${idAquario}
//                     order by id desc`;
//     } */
//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `sselect 
//         temperatura, 
//         umidade,
//         DATE_FORMAT(dataColeta,'%H:%i:%s') as momento_grafico, 
//         fkSensor 
//         from dados join sensor ON fkSensor = idSensor
//         JOIN setor ON fkSetor = idSetor WHERE idSetor = ${idSetor}
//         order by id desc limit ${limite_linhas}`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function buscarMedidasEmTempoReal(idSetor) {

//     instrucaoSql = ''

//     /* if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select top 1
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,  
//                         CONVERT(varchar, momento, 108) as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idSetor} 
//                     order by id desc`;

//     } */ 
//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select 
//         temperatura, 
//         umidade,
//         DATE_FORMAT(dataColeta,'%H:%i:%s') as momento_grafico, 
//         fkSensor 
//         from dados join sensor ON fkSensor = idSensor
//         JOIN setor ON fkSetor = idSetor WHERE idSetor = ${idSetor}
//         order by id desc limit 1`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    buscarUltimosDados,
    buscarUltimosDadosGrafico,
    buscarUltimoDadoGrafico
}
