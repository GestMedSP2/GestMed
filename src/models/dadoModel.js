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
        ON idSensor = fkSensor JOIN setor
        ON idSetor = fkSetor
        WHERE idSetor = ${idSetor} ORDER BY dataColeta DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimosDadosGrafico(idSetor, horarios) {
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
        ON idSensor = fkSensor JOIN setor
        ON idSetor = fkSetor
        WHERE DATE_FORMAT(dataColeta, '%H:%i') IN ('${horarios.replaceAll(",", "','")}') AND idSetor = ${idSetor} GROUP BY DATE_FORMAT(dataColeta, '%H:%i') ORDER BY dataColeta;`;
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
        ON idSensor = fkSensor JOIN setor
        ON idSetor = fkSetor
        WHERE idSetor = ${idSetor} GROUP BY DATE_FORMAT(dataColeta, '%H:%i') ORDER BY dataColeta DESC LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosSemana(idSetor) {
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
        instrucaoSql = `SELECT WEEKDAY(dataColeta) as DataColeta, TRUNCATE(AVG(temperatura), 1) as Temperatura, TRUNCATE(AVG(umidade), 1) as Umidade FROM dados JOIN sensor 
        ON idSensor = fkSensor
        JOIN setor ON idSetor = fkSetor
        WHERE DAY(dataColeta) > DAY(CURRENT_DATE()) - 7 AND idSetor = ${idSetor} GROUP BY WEEKDAY(dataColeta) ORDER BY WEEKDAY(dataColeta);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosUltimas12Horas(idSetor) {
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
        instrucaoSql = `SELECT HOUR(dataColeta) as DataColeta, TRUNCATE(AVG(temperatura), 1) as Temperatura, TRUNCATE(AVG(umidade), 1) as Umidade FROM dados JOIN sensor
        ON idSensor = fkSensor JOIN setor
        ON idSetor = fkSetor
        WHERE dataColeta >= DATE_SUB(NOW(), INTERVAL 12 HOUR) AND idSetor = ${idSetor} GROUP BY HOUR(dataColeta) ORDER BY HOUR(dataColeta);`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dadoMaisAlto12Horas(idSetor) {
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
        instrucaoSql = `SELECT DATE_FORMAT(dataColeta, '%H:%i') as DataColeta, TRUNCATE(MAX(temperatura), 1) as Temperatura, TRUNCATE(MAX(umidade), 1) as Umidade FROM dados JOIN sensor ON idSensor = fkSensor JOIN setor ON fkSetor = idSetor
        WHERE dataColeta >= DATE_SUB(NOW(), INTERVAL 12 HOUR) AND idSetor = ${idSetor} GROUP BY DATE_FORMAT(dataColeta, '%H:%i') ORDER BY DATE_FORMAT(dataColeta, '%H:%i');`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dadoMaisAltoSemana(idSetor) {
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
        instrucaoSql = `SELECT TRUNCATE(MAX(temperatura), 1) as Temperatura, TRUNCATE(MAX(umidade), 1) as Umidade FROM dados JOIN sensor
        ON idSensor = fkSensor
        JOIN setor ON idSetor = fkSetor
        WHERE DAY(dataColeta) > DAY(CURRENT_DATE()) - 7 AND idSetor = ${idSetor};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosDados,
    buscarUltimosDadosGrafico,
    buscarUltimoDadoGrafico,
    buscarDadosSemana,
    buscarDadosUltimas12Horas,
    dadoMaisAlto12Horas,
    dadoMaisAltoSemana
}
