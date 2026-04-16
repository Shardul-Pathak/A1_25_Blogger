const express = require('express');
const router = express.Router();
const catController = require('../controllers/categroy-controller');
const validation = require('../helpers/validation');

router.get("/getcategory", catController.getcategory);

router.post("/addcat", validation.catValidation, catController.addCategory);

router.put("/updatestatus", catController.updateStatus);

router.delete("/deletecat", catController.updateStatus);

module.exports = router;