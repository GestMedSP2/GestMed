var express = require("express");
var router = express.Router();

var dadoController = require("../controllers/dadoController");

router.get("/ultimos/:idSetor", function (req, res) {
    dadoController.buscarUltimosDados(req, res);
});

router.get("/graficosLinha/:idSetor", function (req, res) {
    dadoController.buscarUltimosDadosGrafico(req, res);
});

router.get("/graficosLinhaAtualizado/:idSetor", function (req, res) {
    dadoController.buscarUltimoDadoGrafico(req, res);
});

module.exports = router;