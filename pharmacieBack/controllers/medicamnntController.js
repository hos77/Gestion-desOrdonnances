const Medicament = require('../models/medicament');

exports.addMedicament = async (req, res) => {
    try {
      const { reference, nom, prix, remboursable } = req.body;
  
      const newMedicament = new Medicament({
        reference,
        nom,
        prix,
        remboursable,
      });
  
      const savedMedicament = await newMedicament.save();
  
      res.status(201).json(savedMedicament);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.editMedicament = async (req, res) => {
    try {
      const medicamentId = req.params.medicamentId;
      const { reference, nom, prix, remboursable } = req.body;
  
      const updatedMedicament = await Medicament.findByIdAndUpdate(
        medicamentId,
        { reference, nom, prix, remboursable },
        { new: true }
      );
  
      if (!updatedMedicament) {
        return res.status(404).json({ message: 'Medicament not found' });
      }
      res.status(200).json(updatedMedicament);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.findMedicamentById = async (req, res) => {
    try {
      const medicamentId = req.params.medicamentId;
  
      const medicament = await Medicament.findById(medicamentId);
  
      if (!medicament) {
        return res.status(404).json({ message: 'Medicament not found' });
      }
  
      res.status(200).json(medicament);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.findAllMedicaments = async (req, res) => {
    try {
      const medicaments = await Medicament.find();
  
      res.status(200).json(medicaments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.deleteMedicament = async (req, res) => {
    try {
      const medicamentId = req.params.medicamentId;
  
      const deletedMedicament = await Medicament.findByIdAndDelete(medicamentId);
  
      if (!deletedMedicament) {
        return res.status(404).json({ message: 'Medicament not found' });
      }

      res.status(200).json({ message: 'Medicament deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.findMedicamentsByNom = async (req, res) => {
    try {
      const medicamentNom = req.params.medicamentNom;
      const medicaments = await Medicament.find({
        nom: { $regex: new RegExp(medicamentNom, 'i') }
      });
  
      res.status(200).json(medicaments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.findMedicamentByNomone = async (req, res) => {
    try {
      const medicamentNom = req.params.medicamentNom;
      const medicament = await Medicament.findOne({
        nom: { $regex: new RegExp(medicamentNom, 'i') }
      });
  
      if (medicament) {
        res.status(200).json(medicament);
      } else {
        res.status(404).json({ message: 'Medicament not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  exports.findMedicamentsByReferenece = async (req, res) => {
    try {
      const medicamentReference = req.params.medicamentRef;
      const medicaments = await Medicament.find({
        reference: { $regex: new RegExp(medicamentReference, 'i') }
      });
  
      res.status(200).json(medicaments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.findMedicamentsRemboursable = async (req, res) => {
    try {
      const medicamentsRemboursable = await Medicament.find({
        remboursable: true
      });
  
      res.status(200).json(medicamentsRemboursable);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.findMedicamentsNonRemboursable = async (req, res) => {
    try {
      const medicamentsRemboursable = await Medicament.find({
        remboursable: false
      });
  
      res.status(200).json(medicamentsRemboursable);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };




