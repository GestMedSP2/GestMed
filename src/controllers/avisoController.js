var avisoModel = require("../models/avisoModel");

function listar(req, res) {
    var { idEmpresa } = req.params; 

    if (idEmpresa == undefined) {
        res.status(400).send("O id da empresa está indefinido!");
    } else {
        avisoModel.listar(idEmpresa).then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    listar
}