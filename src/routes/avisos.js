var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/listar/:idEmpresa", function (req, res) {
    avisoController.listar(req, res);
});

module.exports = router;