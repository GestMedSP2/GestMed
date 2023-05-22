var express = require("express");
var router = express.Router();

var dadoController = require("../controllers/dadoController");

router.get("/ultimos/:idSetor", function (req, res) {
    dadoController.buscarUltimosDados(req, res);
});

router.get("/graficosLinha/:idSetor/:horarios", function (req, res) {
    dadoController.buscarUltimosDadosGrafico(req, res);
});

router.get("/graficosLinhaAtualizado/:idSetor", function (req, res) {
    dadoController.buscarUltimoDadoGrafico(req, res);
});

router.get('/semana/:idSetor', function (req, res) {
    dadoController.buscarDadosSemana(req, res);
});

router.get('/ultimas12horas/:idSetor', function (req, res) {
    dadoController.buscarDadosUltimas12Horas(req, res);
});

router.get('/dadoMaisAlto12Horas/:idSetor', function (req, res) {
    dadoController.dadoMaisAlto12Horas(req, res);
});

router.get('/dadoMaisAltoSemana/:idSetor', function (req, res) {
    dadoController.dadoMaisAltoSemana(req, res);
});

module.exports = router;