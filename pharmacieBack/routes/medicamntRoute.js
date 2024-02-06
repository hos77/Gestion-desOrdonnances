
const express = require('express');
const router = express.Router();
const medicamentController = require('../controllers/medicamnntController');


router.post('/', medicamentController.addMedicament);
router.put('/:medicamentId', medicamentController.editMedicament);
router.get('/:medicamentId', medicamentController.findMedicamentById);
router.get('/findMedicamentBynnom/:medicamentNom', medicamentController.findMedicamentsByNom);
router.get('/findMedicamentBynnomone/:medicamentNom', medicamentController.findMedicamentByNomone);
router.get('/findMedicamentByref/:medicamentRef', medicamentController.findMedicamentsByReferenece);
router.get('/findMedicamnetRemboursable/remboursable', medicamentController.findMedicamentsRemboursable);
router.get('/findMedicamnetNonRemboursable/nonremboursable', medicamentController.findMedicamentsNonRemboursable);
router.get('/', medicamentController.findAllMedicaments);

router.delete('/:medicamentId', medicamentController.deleteMedicament);

module.exports = router;
