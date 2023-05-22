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

module.exports = {
    criar,
}