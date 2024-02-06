const express = require('express');
const router = express.Router();
const ordonnanceController = require('../controllers/ordonnanceController');
const authMiddleware = require('../middlewares/auth'); 


router.post('/', ordonnanceController.addOrdonnnance);

router.get('/',  ordonnanceController.findAllOrdonnances);

router.delete('/:ordonnanceId',  ordonnanceController.deleteOrdonnance);

router.get('/:id',  ordonnanceController.findOrdonnanceById);

router.get('/findOrdonnancesByAdherant/:adherantId', ordonnanceController.findOrdonnancesByAdherant);

router.get('/findOrdonnancesByEtatFalse/false',  ordonnanceController.findOrdonnancesByEtatFalse);

router.get('/findOrdonnancesByEtatTrue/true', ordonnanceController.findOrdonnancesByEtatTrue);

module.exports = router;
