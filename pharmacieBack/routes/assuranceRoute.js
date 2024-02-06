const express = require('express');
const router = express.Router();
const assuranceController = require('../controllers/assuranceController');  

router.post('/', assuranceController.createAssurance);
router.put('/:assuranceId', assuranceController.updateAssurance);
router.get('/', assuranceController.findAllAssurances);
router.get('/:assuranceId', assuranceController.findAssuranceById);
router.delete('/:assuranceId', assuranceController.deleteAssurance);



module.exports = router;