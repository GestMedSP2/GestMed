var dadoModel = require("../models/dadoModel");

function buscarUltimosDados(req, res) {
    var { idSetor } = req.params;

    dadoModel.buscarUltimosDados(idSetor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimosDadosGrafico(req, res) {
    var { idSetor, horarios } = req.params;

    dadoModel.buscarUltimosDadosGrafico(idSetor, horarios).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimoDadoGrafico(req, res) {
    var { idSetor } = req.params;

    dadoModel.buscarUltimoDadoGrafico(idSetor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosSemana(req, res) {
    var { idSetor } = req.params;

    dadoModel.buscarDadosSemana(idSetor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas da semana.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosUltimas12Horas(req, res) {
    var { idSetor } = req.params;

    dadoModel.buscarDadosUltimas12Horas(idSetor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas da semana.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function dadoMaisAlto12Horas(req, res) {
    var { idSetor } = req.params;

    dadoModel.dadoMaisAlto12Horas(idSetor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas da semana.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function dadoMaisAltoSemana(req, res) {
    var { idSetor } = req.params;

    dadoModel.dadoMaisAltoSemana(idSetor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas da semana.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
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