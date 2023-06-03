var setorModel = require("../models/setorModel");

function criar(req, res) {
    var { nome, armazenaTermolabeis } = req.body;
    var { idEmpresa } = req.params;

    if (nome == undefined) {
        res.status(400).send("O nome do setor está indefinido!");
    } else if (armazenaTermolabeis == undefined) {
        res.status(400).send("A opção de armazenamento está indefinido!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("O idEmpresa está indefinido!");
    } else {
        setorModel.criar(idEmpresa, nome, armazenaTermolabeis)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listar(req, res) {
    var { idEmpresa } = req.params;

    if (idEmpresa == undefined) {
        res.status(400).send("O id da empresa não está indefinido!");
    } else {
        setorModel.listar(idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function detalhar(req, res) {
    var { idSetor } = req.params;

    if (idSetor == undefined) {
        res.status(400).send("O id do setor não está indefinido!");
    } else {
        setorModel.detalhar(idSetor)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function adicionarSensor(req, res) {
    var { idSetor } = req.params;
    var { idEmpresa, idSensor } = req.body;

    if(idSetor == undefined) {
        res.status(400).send("O id do setor não está definido!");
    } else if(idEmpresa == undefined) {
        res.status(400).send("O id da empresa não está definido!");
    } else if(idSensor == undefined) {
        res.status(400).send("O id da sensor não está definido!");
    } else {
        setorModel.adicionarSensor(idSetor, idEmpresa, idSensor).then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

module.exports = {
    criar,
    listar,
    detalhar,
    adicionarSensor
}