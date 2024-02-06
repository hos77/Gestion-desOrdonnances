const express = require('express');
const bordereuController = require('../controllers/bordereauController');
const router = express.Router();
router.post('/', bordereuController.generateBorderau);
router.get('/',  bordereuController.findAllBorderau);
router.get('/:id',  bordereuController.findBorderauById);
router.put('/changeEtat/:borderauId',  bordereuController.changeEtatBorderau);
router.put('/changeEtatFalse/:borderauId',  bordereuController.changeEtatBorderaufalse);



module.exports = router;