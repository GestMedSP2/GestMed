var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionariosController");

router.get("/", function (req, res) {
    funcionarioController.testar(req, res);
});

router.get("/listar/:idEmpresa", function (req, res) {
    funcionarioController.listar(req, res);
});


module.exports = router;