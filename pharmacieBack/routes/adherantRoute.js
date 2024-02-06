
const express = require('express');
const adherantController = require('../controllers/adherantController');
const router = express.Router();


router.post('/', adherantController.createAdherantInAssurance);
router.get('/', adherantController.getAllAdherants);
router.put('/:adherantId', adherantController.updateAdherant);
router.get('/:adherantId', adherantController.getAdherantById);
router.delete('/:adherantId', adherantController.deleteAdherant);
router.get('/findByassuranceName/:assuranceName', adherantController.findAdherantsByAssuranceName);
router.get('/findByassuranceId/:assuranceId', adherantController.findAdherantByAssuranceId);
router.get('/GetAllAssuranceName/AssuranceName', adherantController.getAllAssuranceNames);




module.exports = router;