var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");

router.post("/criar/:idEmpresa", function (req, res) {
    setorController.criar(req, res);
});

router.get('/listar/:idEmpresa', function (req, res) {
    setorController.listar(req, res);
});

router.get('/detalhar/:idSetor', function (req, res) {
    setorController.detalhar(req, res);
})

module.exports = router;