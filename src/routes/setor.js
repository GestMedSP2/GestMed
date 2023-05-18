var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");

router.post("/criar/:idEmpresa", function (req, res) {
    setorController.criar(req, res);
});

module.exports = router;